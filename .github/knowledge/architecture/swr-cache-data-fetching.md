# SWR: Stale-While-Revalidate Architecture & Reference Guide

> **Authoritative Specification**: [`.agents/skills/swr-cache-data-fetching/SKILL.md`](../../../.agents/skills/swr-cache-data-fetching/SKILL.md)
> **Aliases**: `apply skill swr`, `apply skill data-fetching`
> **Pillar**: HTTP RFC 5861 Client Caching, Request Deduplication, Optimistic UI, and Backend ETag Handshakes.

---

## 1. Executive Summary

This standard defines client-side data fetching and cache reconciliation for the **SNPI School Management System** across **`snp-sms-web`** and **`snp-sms-api`**. Based on HTTP RFC 5861, cached data is served instantly ($0\text{ ms}$), followed by background revalidation and seamless UI updates.

---

## 2. Document Index & Knowledge References

| Module | Core Subject                | Target Capability                                       | Authoritative File                                                                                                             |
| :----- | :-------------------------- | :------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------- |
| **01** | **RFC 5861 Caching**        | HTTP headers, stale-while-revalidate, ETag 304          | [01-rfc-5861-stale-while-revalidate.md](../../../.agents/skills/swr-cache-data-fetching/01-rfc-5861-stale-while-revalidate.md) |
| **02** | **12 Core Capabilities**    | Deduplication, focus/reconnect, optimistic mutation     | [02-swr-12-core-capabilities.md](../../../.agents/skills/swr-cache-data-fetching/02-swr-12-core-capabilities.md)               |
| **03** | **Backend API Integration** | Express 5 middleware, conditional GET, mutation returns | [03-backend-api-integration.md](../../../.agents/skills/swr-cache-data-fetching/03-backend-api-integration.md)                 |

---

## 3. Mandatory 10-Point SWR Quality Gate

Every client-side data hook and backend cache header must adhere to the 10-point quality gate specified in [`SKILL.md`](../../../.agents/skills/swr-cache-data-fetching/SKILL.md).
