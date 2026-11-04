import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

function testCompression(): void {
  const targetPath = process.argv[2];

  if (!targetPath) {
    console.error('Usage: tsx scripts/test-git-compression.ts <filePath>');
    process.exit(1);
  }

  const resolvedPath = path.resolve(process.cwd(), targetPath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`File not found: ${resolvedPath}`);
    process.exit(1);
  }

  const stat = fs.statSync(resolvedPath);
  if (stat.isDirectory()) {
    console.error(`Specified path is a directory: ${resolvedPath}`);
    process.exit(1);
  }

  const inputBuffer = fs.readFileSync(resolvedPath);
  const compressedBuffer = zlib.deflateSync(inputBuffer);

  const inputSize = inputBuffer.length;
  const compressedSize = compressedBuffer.length;
  const ratio = Math.round((1 - compressedSize / (inputSize || 1)) * 10000) / 100;

  console.log('================================================================================');
  console.log('                GIT LFS VS NATIVE GIT COMPRESSION TESTER                       ');
  console.log('================================================================================');
  console.log(`  File Evaluated    : ${targetPath}`);
  console.log(
    `  Input Size        : ${inputSize.toLocaleString()} bytes (${(inputSize / 1024).toFixed(2)} KB)`,
  );
  console.log(
    `  Compressed Size   : ${compressedSize.toLocaleString()} bytes (${(compressedSize / 1024).toFixed(2)} KB)`,
  );
  console.log(`  Compression Ratio : ${ratio}%`);
  console.log('--------------------------------------------------------------------------------');

  if (ratio < 25.0) {
    console.log('  Recommendation    : [GIT LFS]');
    console.log(
      '  Reasoning         : Pre-compressed or binary file format. Low compression efficiency in Git.',
    );
    console.log(
      '                      Storing in native Git will cause duplicate storage blobs across history.',
    );
  } else {
    console.log('  Recommendation    : [NATIVE GIT]');
    console.log(
      '  Reasoning         : Compressible text format. Git delta packing and zlib compression will',
    );
    console.log(
      '                      store revisions efficiently. Using Git LFS would balloon bandwidth.',
    );
  }
  console.log('================================================================================\n');
}

testCompression();
