---
Last updated: 2026-10-02
Domain: ci-cd
Version: 1.1
Reviewed by: Architecture & Infrastructure Review Board
Author: James Garcia (Updated October 2, 2026)
Dedication: In memory of John Wiebalk (@jwiebalk)
---

# Git Large File Storage (LFS) Architecture & Decision Framework

A Git repository contains every version of every file. For certain file types, storing every revision inside standard Git object databases degrades clone and fetch performance across teams.

Git Large File Storage (LFS) replaces large files with lightweight text pointers inside the Git repository, while storing actual file contents on remote LFS servers (such as GitHub, Artifactory, or S3).

---

## 1. Key Evaluation Checklist: The 3 Core Questions

Before introducing Git LFS, evaluate files against three core criteria:

```
+---------------------------------------------------------------------------------------------------+
|                                  GIT LFS DECISION TRIAD                                           |
+---------------------------------------------------------------------------------------------------+
| 1. Does the file diff?                                                                            |
|    * Binaries cannot diff cleanly. Git stores full duplicate blobs on every revision.             |
|    * Plaintext files (JSON, CSV, TS, XML) generate small diffs and benefit from delta compression.|
+---------------------------------------------------------------------------------------------------+
| 2. Does the file compress well?                                                                   |
|    * Pre-compressed media (.mp4, .png, .jpg, .zip, .tgz) will NOT compress further in Git.      |
|    * Uncompressed text (.json, .xml, .sql, .csv) compresses by 80% - 95% via Git zlib deflate.    |
+---------------------------------------------------------------------------------------------------+
| 3. Does the file change frequently?                                                               |
|    * Frequently modified binaries duplicate storage across history -> LFS HIGHLY RECOMMENDED.     |
|    * Static or infrequently changed files introduce negligible bloat -> LFS OPTIONAL.             |
+---------------------------------------------------------------------------------------------------+
```

---

## 2. When to Use Git LFS

Git LFS provides clear architectural benefits in four primary scenarios:

1. **Frequently Changing Binary Files**:
   - Asset types: Video (`.mp4`, `.mov`), audio (`.wav`, `.mp3`), design mockups (`.psd`, `.ai`), 3D models (`.fbx`, `.blend`).
   - Impact: Without LFS, small incremental binary edits can balloon a 500MB repository to 10GB+ across multiple commits.
2. **Auto-Generated Manifest Files (Not Reviewed by Humans)**:
   - 150MB+ compiled build manifests, binary AST dumps, or machine-generated indices.
   - Keeps working trees fast without bloating developer clone operations.
3. **Excessively Large Historical Files**:
   - Large assets stored strictly for audit/version history rather than daily active editing.
4. **Massive Volumes of Small Media Assets**:
   - High file counts that degrade Git tree walking and object packing performance.

---

## 3. When NOT to Use Git LFS

Git LFS can degrade performance, increase bandwidth, and inflate server costs in these scenarios:

1. **Shared Low-Bandwidth Networks with Highly Compressible Files**:
   - **The Compression Dilemma**: Git compresses objects using zlib; Git LFS transfers and stores raw uncompressed objects.
   - **Real-World Case Study (10x 150MB JSON Manifests)**:

| Metric                         | Stored in Git (Zlib Compressed) | Stored in Git LFS (Uncompressed) | Impact                           |
| :----------------------------- | :------------------------------ | :------------------------------- | :------------------------------- |
| **File Compression Ratio**     | 85% - 95% reduction             | 0% (transferred raw)             | Git wins by `10x`                |
| **Transfer Size Across Wire**  | `~220 MB`                       | `1.5 GB`                         | Git saves `85%` bandwidth        |
| **Per-File Working Tree Size** | `~22 MB`                        | `150 MB`                         | Git reduces local disk footprint |

2. **Repositories with Large Text Files that Change Often**:
   - Git handles text deltas and compression efficiently via `merge-ort`, geometric repacking, and packfile generation.
   - LFS forces a full download of the entire file on every revision without delta savings.
3. **Shallow Clone & Partial Clone Workflows**:
   - Workflows using `git clone --depth=1` or `git clone --filter=blob:none` already fetch only the required commit snapshot.
   - Adding LFS to partial clone workflows adds plugin complexity, authentication friction, and custom hooks with negligible performance gain.

---

## 4. Real-World Repository Comparison

| Metric                           | Repo 1 (Compressible Text Files)          | Repo 2 (Uncompressible Binary Files)     |
| :------------------------------- | :---------------------------------------- | :--------------------------------------- |
| **Git Repository Size on Disk**  | 2.01 GiB                                  | 34.9 GiB                                 |
| **LFS Storage Size on Disk**     | **152 GiB (Ballooned)**                   | **37.2 GiB (Controlled)**                |
| **Files per Branch**             | 1 - 2                                     | 1                                        |
| **Max Individual File Size**     | 1.2 GiB                                   | 498 MiB                                  |
| **Files in History**             | 794                                       | 32                                       |
| **Full Git Clone Size**          | 2.01 GiB                                  | 34.9 GiB                                 |
| **Shallow Clone Size**           | **492 MiB**                               | 891 MiB                                  |
| **LFS Clone Size**               | **1.6 GiB**                               | **902 MiB**                              |
| **Architectural Recommendation** | **AVOID LFS** (Use Shallow/Partial Clone) | **USE GIT LFS** (Substantial server win) |

---

## 5. Automated Compression Evaluation Script

To evaluate whether a given file should reside in Git or Git LFS, test its zlib deflation ratio:

```typescript
// scripts/test-git-compression.ts
import fs from 'node:fs';
import zlib from 'node:zlib';

const filePath = process.argv[2];
if (!filePath || !fs.existsSync(filePath)) {
  console.error('Usage: tsx scripts/test-git-compression.ts <filePath>');
  process.exit(1);
}

const inputBuffer = fs.readFileSync(filePath);
const compressedBuffer = zlib.deflateSync(inputBuffer);

const inputSize = inputBuffer.length;
const compressedSize = compressedBuffer.length;
const ratio = Math.round((1 - compressedSize / inputSize) * 10000) / 100;

console.log(`Input size        : ${inputSize} bytes`);
console.log(`Compressed size   : ${compressedSize} bytes`);
console.log(`Compression ratio : ${ratio}%`);

if (ratio < 25.0) {
  console.log(
    'Recommendation    : [GIT LFS] - Pre-compressed or binary file; does not compress efficiently in Git.',
  );
} else {
  console.log(
    'Recommendation    : [NATIVE GIT] - Compressible text format; Git native delta packing is superior.',
  );
}
```

### Interpretation Heuristic

- **Compression Ratio `< 25%`** (e.g. `.mp4`, `.png`, `.zip`):
  - Binary / pre-compressed asset. Diff is ineffective. **Store in Git LFS** (or external S3/CDN storage).
- **Compression Ratio `>= 30%`** (e.g. `.json`, `.csv`, `.sql`, `.ts`):
  - Compressible text format. Git's packfile compression is superior. **Store in Native Git**.
