---
enable: true
title: "Frequently Asked Questions"
description: "Technical answers on ingestion, excise rules, and filing workbooks."
button:
  enable: true
  label: "Open Live App"
  link: "https://maxvapor-tax.vercel.app/"
items:
  - question: "How does Quantum prevent gross sales double-counting on Avalara exports?"
    answer: "Avalara SalesTaxDocumentLineDetail exports emit separate rows for State, County, City, and Special districts. Quantum deduplicates sale amounts strictly from the State-level row on (documentId, lineNo, itemCode, ref1) while summing tax across all jurisdiction rows."
  - question: "What happens when a state changes its excise rate mid-year?"
    answer: "Every rule in Quantum carries an effective_from date. When Washington or South Carolina updates a rate, historical months remain locked to the exact rule in effect during that filing period."
  - question: "How does Quantum handle SKUs missing wholesale cost or mL volume?"
    answer: "The dashboard flags every sold SKU missing wholesale cost, liquid volume (mL), or Open/Closed system classification so you can resolve gaps before generating state workbooks."
  - question: "What is included in the 5-tab Excel filing workbook?"
    answer: "Every state workbook contains Tab 1 (Step-by-Step Filing Guide), Tab 2 (Return Summary), Tab 3 (County/City Breakdown), Tab 4 (Collected vs Computed Reconciliation), and Tab 5 (Audit Metadata)."
  - question: "Can Quantum dispatch monthly PACT Act reports automatically?"
    answer: "Yes. Quantum compiles state-by-state PACT Act carrier and volume schedules and dispatches them directly to state Department of Revenue recipients after verifying your Google sign-in."
---
