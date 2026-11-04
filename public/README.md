# SNPI-SMS Public Static Assets & Font Directory Guide

Standardized directory structure and asset registry for `apps/frontend/public/`.

---

## 1. Directory Structure Overview

```
apps/frontend/public/
├── images/                          # Brand SVGs, Vectors & Graphics
│   ├── logo.png                     # Official SNPI Primary Logo (PNG)
│   ├── background.svg               # Complex Vector Mesh Background
│   ├── cardbanknote.svg             # Financial & Payment Voucher Vector
│   ├── disc.svg                     # Concentric Radar Graphic
│   ├── flower.svg                   # 8-Lobed Organic Blossom Cutout Shape
│   ├── gum.svg                      # Wavy Pill Bubble Container Shape
│   └── hexagon.svg                  # Chamfered Geometric Polygon Shape
├── fonts/                           # 89 Local Typography Assets
│   ├── khmer-display/               # 18 Khmer Display & Title Fonts
│   ├── khmer-body/                  # 21 Khmer Body & Paragraph Fonts
│   ├── khmer-official/              # 10 Institutional & Ministry Fonts
│   ├── latin/                       # 33 Modern Latin UI Fonts
│   ├── monospace/                   # 3 Monospace Code Fonts
│   ├── icons/                       # 3 Font Awesome Icon Fonts
│   └── docs/                        # Scoped Docs Typography (Sora)
└── .well-known/                     # Security disclosure files
```

---

## 2. Image Assets Catalog

| Filename           | Path                       | Format | Usage Context                                   |
| :----------------- | :------------------------- | :----- | :---------------------------------------------- |
| `logo.png`         | `/images/logo.png`         | PNG    | Official SNPI School Logo (Header, Auth, Cards) |
| `flower.svg`       | `/images/flower.svg`       | SVG    | Organic Blossom Mascot & Image Mask Cutout      |
| `gum.svg`          | `/images/gum.svg`          | SVG    | Wavy Bubble Mascot & Program Search Container   |
| `hexagon.svg`      | `/images/hexagon.svg`      | SVG    | Inquisitive Squircle Mascot & Badge Container   |
| `disc.svg`         | `/images/disc.svg`         | SVG    | Radar Concentric Rings in Hero Discovery Badge  |
| `background.svg`   | `/images/background.svg`   | SVG    | Complex Multi-Ring Geometric Background         |
| `cardbanknote.svg` | `/images/cardbanknote.svg` | SVG    | Currency, Tuition & Fee Voucher Graphic         |

---

## 3. Font Assets Catalog

### 01. Khmer Display / Title (`/fonts/khmer-display/`)

- `angkor.ttf` (`Angkor`) &rarr; `.font-khmer-angkor`
- `bayon.ttf` (`Bayon`) &rarr; `.font-khmer-bayon`
- `bokor.ttf` (`Bokor`) &rarr; `.font-khmer-bokor`
- `chenla.ttf` (`Chenla`) &rarr; `.font-khmer-chenla`
- `dangrek.ttf` (`Dangrek`) &rarr; `.font-khmer-dangrek`
- `fasthand.ttf` (`Fasthand`) &rarr; `.font-khmer-fasthand`
- `freehand.ttf` (`Freehand`) &rarr; `.font-khmer-freehand`
- `kh-muol.ttf` (`KhMuol`) &rarr; `.font-khmer-muol`
- `khmer-os-freehand.ttf` (`KhmerOSFreehand`)
- `khmeros-muollight.ttf` (`KhmerOSMuolLight`)
- `koulen.ttf` (`Koulen`) &rarr; `.font-khmer-koulen`
- `metal.ttf` (`Metal`) &rarr; `.font-khmer-metal`
- `moul.ttf` (`Moul`) &rarr; `.font-khmer-moul`
- `moulpali.ttf` (`Moulpali`) &rarr; `.font-khmer-moulpali`
- `odor-mean-chey.ttf` (`OdorMeanChey`) &rarr; `.font-khmer-odor`
- `preahvihear.ttf` (`Preahvihear`) &rarr; `.font-khmer-preahvihear`
- `taprom.ttf` (`Taprom`) &rarr; `.font-khmer-taprom`
- `khmer-moulpali-reg.ttf` (`KhmerMoulpaliRegular`)

### 02. Khmer Body Text (`/fonts/khmer-body/`)

- `battambang.ttf` & `battambang-bold.ttf` (`Battambang`) &rarr; `.font-khmer-battambang`
- `content.ttf` & `content-bold.ttf` (`Content`) &rarr; `.font-khmer-content`
- `hanuman.ttf` & `hanuman-bold.ttf` (`Hanuman`) &rarr; `.font-khmer-hanuman`
- `kantumruy.ttf`, `kantumruy-light.ttf`, `kantumruy-bold.ttf` (`Kantumruy`) &rarr; `.font-khmer-kantumruy`
- `kdam-thmor.ttf` (`KdamThmor`) &rarr; `.font-khmer-kdam-thmor`
- `kh-content.ttf` (`KhContent`)
- `kh-kangrey.ttf` (`KhKangrey`)
- `khmer.ttf` (`Khmer`)
- `niradei.ttf` (`Niradei`) &rarr; `.font-khmer-niradei`
- `nokora.ttf` & `nokora-bold.ttf` (`Nokora`) &rarr; `.font-khmer-nokora`
- `siemreap.ttf` (`Siemreap`) &rarr; `.font-khmer-siemreap`
- `suwannaphum.ttf` (`Suwannaphum`) &rarr; `.font-khmer-suwannaphum`
- `khmer-hanuman.ttf`, `khmer-hanuman-light.ttf`, `khmer-hanuman-bold.ttf`

### 03. Khmer Institutional & Official (`/fonts/khmer-official/`)

- `khmeros.ttf` (`KhmerOS`) &rarr; `.font-khmer-os`
- `khmeros-battambang.ttf` & `khmeros-battambang-alt.ttf` (`KhmerOSBattambang`) &rarr; `.font-khmer-os-battambang`
- `khmeros-siemreap.ttf` & `khmeros-siemreap-alt.ttf` (`KhmerOSSiemreap`) &rarr; `.font-khmer-os-siemreap`
- `khmeros-content.ttf` (`KhmerOSContent`)
- `khmeros-sys.ttf` (`KhmerOSSys`)
- `khmer-mef1.ttf` (`KhmerMEF1`) &rarr; `.font-khmer-mef1`
- `khmer-mef2.ttf` (`KhmerMEF2`) &rarr; `.font-khmer-mef2`
- `khbaphnom-limon.ttf` (`KhbaphnomLimon`)

### 04. Latin Modern UI (`/fonts/latin/`)

- `google-sans.ttf` & `google-sans-italic.ttf` (`GoogleSans`) &rarr; `.font-google-sans`
- `inter.otf`, `inter-medium.otf`, `inter-semibold.otf`, `inter-bold.otf`, etc. (`Inter`) &rarr; `.font-inter`
- `mona-sans.otf` & `mona-sans-semibold.otf` (`MonaSans`) &rarr; `.font-mona-sans`
- `nunito.ttf`, `nunito-bold.ttf`, `nunito-black.ttf`, etc. (`Nunito`) &rarr; `.font-nunito`
- `tt-firs-neue.ttf`, `tt-firs-neue-medium.ttf`, `tt-firs-neue-demibold.ttf` (`TTFirsNeue`) &rarr; `.font-tt-firs`
- `nexa-light.otf` (`NexaLight`) &rarr; `.font-nexa`
- `faculty-glyphic.ttf` (`FacultyGlyphic`) &rarr; `.font-faculty`
- `helvetica.ttf` (`Helvetica`)
- `open-sans.ttf` & `open-sans-semibold.ttf` (`OpenSans`)
- `source-sans-pro.ttf` & `source-sans-pro-bold.ttf` (`SourceSansPro`)
- `poppins-medium.ttf` (`PoppinsMedium`)
- `roboto.ttf` & `roboto-light.ttf` (`Roboto`)

### 05. Monospace Code (`/fonts/monospace/`)

- `roboto-mono.ttf`, `roboto-mono-regular.ttf`, `roboto-mono-alt.ttf` (`RobotoMono`) &rarr; `.font-roboto-mono`

### 06. Icon Symbols (`/fonts/icons/`)

- `fontawesome-solid.otf` (`FontAwesomeSolid`) &rarr; `.font-fa-solid`
- `fontawesome-regular.otf` (`FontAwesomeRegular`) &rarr; `.font-fa-regular`
- `fontawesome-brands.otf` (`FontAwesomeBrands`) &rarr; `.font-fa-brands`

---

## 4. Usage in TypeScript / TSX

```tsx
import { ASSETS } from '@/lib/asset-registry';

// Using images
<Image src={ASSETS.images.logo} alt="SNPI Logo" width={64} height={64} />
<img src={ASSETS.images.flower} alt="Blossom" />

// Using CSS classes
<h1 className="font-khmer-koulen text-3xl">វិទ្យាស្ថានពហុបច្ចេកទេស</h1>
<p className="font-khmer-battambang text-sm">ព័ត៌មាននិស្សិត</p>
<span className="font-google-sans font-bold">SNPI Academic Portal</span>
```
