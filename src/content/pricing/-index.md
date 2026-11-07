---
title: "Pricing"
meta_title: "Pricing - Quantum Sales Tax & Excise Automation"
description: "Simple, transparent tiers for multi-state sales tax, vapor excise, and PACT Act automation."
image: ""
draft: false

page_header:
  badge: "Pricing"
  title: "Pricing Built for Multi-State Tax & Excise"
  content: "Scale from regional returns to 50-state PACT Act and checkout API automation."

toggler:
  monthly_label: "Monthly"
  yearly_label: "Yearly"

plans:
  - title: "Regional"
    price: "290"
    yearly_price: "2900"
    is_featured: false
    button:
      enable: true
      label: "Open Workspace"
      link: "https://maxvapor-tax.vercel.app/"
    description: "Essential sales tax and vapor excise workbooks for up to 10 active states."
    features:
      - label: "Up to 10 Active State Returns"
        included: true
      - label: "Streamed Avalara & Shopify Ingest"
        included: true
        tooltip: "400-row idempotent batch streaming."
      - label: "5-Tab Excel Filing Workbooks"
        included: true
      - label: "Automated PACT Act Dispatch"
        included: false
      - label: "Real-Time Checkout Tax API"
        included: false

  - title: "Multi-State Pro"
    price: "690"
    yearly_price: "6900"
    is_featured: true
    offer_text: Most Popular
    button:
      enable: true
      label: "Open Workspace"
      link: "https://maxvapor-tax.vercel.app/"
    description: "Complete 50-state sales tax, vapor excise, and PACT Act automation."
    features:
      - label: "All 50 US Jurisdictions"
        included: true
      - label: "Wholesale, mL & Bifurcated Excise"
        included: true
        tooltip: "Includes WA, SC, CA, NJ, IL, KS, NC, NY."
      - label: "Automated PACT Act Email Dispatch"
        included: true
      - label: "SKU Catalog Gap & Fuzzy Matcher"
        included: true
      - label: "AES-256 Encrypted Portal Vault"
        included: true

  - title: "Enterprise API"
    price: "1290"
    yearly_price: "12900"
    is_featured: false
    button:
      enable: true
      label: "Contact Engineering"
      link: "/contact"
    description: "Multi-entity filing plus sub-15ms checkout tax calculation API."
    features:
      - label: "Everything in Multi-State Pro"
        included: true
      - label: "Real-Time Checkout Tax API"
        included: true
        tooltip: "Sub-15ms address-level sales and excise calculation."
      - label: "Multi-Store & Multi-FEIN Support"
        included: true
      - label: "Custom ERP & NetSuite Webhooks"
        included: true
      - label: "Dedicated Compliance Engineer"
        included: true

comparison:
  enable: true
  badge: "Plan Matrix"
  title: "Filing Tiers <strong>Comparison</strong>"
  headers:
    - label: "Capabilities"
    - label: "Regional"
    - label: "Multi-State Pro"
    - label: "Enterprise API"
  rows:
    - feature: "Monthly Price"
      values: ["$290", "$690", "$1,290"]
    - feature: "Active Jurisdictions"
      values: ["Up to 10", "All 50 States", "Unlimited Entities"]
    - feature: "5-Tab Excel Workbooks"
      values: [true, true, true]
    - feature: "State-Row Sale Deduplication"
      values: [true, true, true]
    - feature: "SKU Cost & mL Gap Detection"
      values: [true, true, true]
    - feature: "Automated PACT Act Dispatch"
      values: [false, true, true]
    - feature: "AES-256 Portal Credential Vault"
      values: [false, true, true]
    - feature: "Real-Time Checkout Tax API"
      values: [false, false, true]
    - feature: "Multi-Store Consolidation"
      values: [false, false, true]
    - feature: "Support"
      values: ["Standard", "Priority Tax Ops", "Dedicated Engineer"]
---
