# 📘 Project Logbook  
## **Project Title:** An Intelligent Fraud Internship Detection System (InternShield AI)

---

## 📑 Index

| Sr.No | Week No | Contents                         | Date                    |
|------:|:-------:|----------------------------------|-------------------------|
| 1     | Week 01 | Project Group Formation          | 08/01/2026 – 15/01/2026 |
| 2     | Week 02 | Project Topic Finalization       | 19/01/2026 – 29/01/2026 |
| 3     | Week 03 | Requirement Analysis             | 29/01/2026 – 31/01/2026 |
| 4     | Week 04 | System Architecture Design       | 07/02/2026 – 18/02/2026 |
| 5     | Week 05 | Implementation Phase – I         | 19/02/2026 – 28/02/2026 |
| 6     | Week 06 | Design & Implementation          | 01/03/2026 – 09/03/2026 |
| 7     | Week 07 | Implementation Phase – II        | 10/03/2026 – 27/03/2026 |
| 8     | Week 08 | Implementation Phase – III       | 28/03/2026 – 01/04/2026 |
| 9     | Week 09 | System Testing                   | 05/04/2026 – 27/04/2026 |
| 10    | Week 10 | Results & Analysis               | 28/04/2026 – 09/05/2026 |
| 11    | Week 11 | Final Report & Conclusion        | 09/05/2026 – 16/05/2026 |

---

## 📅 Week 01: Project Group Formation  
**Date:** 08/01/2026 – 15/01/2026  

- Formed project group and assigned roles:
  - ML model development  
  - Backend development  
  - Frontend design  
  - Documentation  
- Brainstormed real-world issues like online fraud and scam internships.  

**Guide Interaction:**  
Guide suggested selecting a socially relevant and impactful project.  

**Next Plan:**  
Finalize project topic.  

---

## 📅 Week 02: Project Topic Finalization  
**Date:** 19/01/2026 – 29/01/2026  

- Explored domains: AI, Cybersecurity, Web Applications.  
- Identified increasing fake internship scams targeting students.  
- Finalized project:  
👉 *An Intelligent Fraud Internship Detection System (InternShield AI)*  

**Guide Interaction:**  
Guide suggested integrating Machine Learning + NLP + Web system.  

**Next Plan:**  
Requirement analysis.  

---

## 📅 Week 03: Requirement Analysis & System Study  
**Date:** 29/01/2026 – 31/01/2026  

- Defined system inputs:
  - Company name  
  - Description  
  - Stipend  
  - Fees  
  - Website URL  
  - Email  

- Defined outputs:
  - Genuine / Suspicious / Fraudulent  
  - Risk score  
  - Explanation  

- Studied existing systems and identified limitations (manual verification, lack of automation).  

**Guide Interaction:**  
Guide suggested focusing on scam patterns, NLP, and automation.  

**Next Plan:**  
System architecture design.  

---

## 📅 Week 04: System Architecture Design  
**Date:** 07/02/2026 – 18/02/2026  

- Designed system modules:
  - React-based Frontend  
  - Internship Input Module  
  - Data Preprocessing Module  
  - ML Detection Module  
  - Result & Explanation Module  
  - MongoDB Database  

- Defined system flow:  
User Input → Preprocessing → ML Model → Result → Store in Database  

**Guide Interaction:**  
Guide suggested including database for storing history and analysis.  

**Next Plan:**  
Start implementation.  

---

## 📅 Week 05: Implementation Phase – I  
**Date:** 19/02/2026 – 28/02/2026  

- Finalized tech stack:
  - Frontend: React  
  - Backend: Flask  
  - Database: MongoDB  

- Collected dataset from Kaggle (real and fake job postings).  
- Started preprocessing of text data.  

**Guide Interaction:**  
Guide suggested focusing on scam-related features.  

**Next Plan:**  
Feature extraction and model preparation.  

---

## 📅 Week 06: Design & Implementation  
**Date:** 01/03/2026 – 09/03/2026  

- Developed React UI for internship input and result display.  
- Implemented preprocessing:
  - Stopword removal  
  - Text cleaning  
  - Lowercasing  

- Applied TF-IDF vectorization.  

**Guide Interaction:**  
Guide suggested improving UI clarity and input validation.  

**Next Plan:**  
Train ML models.  

---

## 📅 Week 07: Implementation Phase – II  
**Date:** 10/03/2026 – 27/03/2026  

- Trained and compared models:
  - Logistic Regression  
  - Naive Bayes  
  - Random Forest  
  - XGBoost  

- Evaluated using:
  - Accuracy  
  - Precision  
  - Recall  
  - F1-score  

- Selected XGBoost as best-performing model.  

**Guide Interaction:**  
Guide suggested selecting model based on fraud detection performance.  

**Next Plan:**  
Model integration.  

---

## 📅 Week 08: Implementation Phase – III  
**Date:** 28/03/2026 – 01/04/2026  

- Saved trained model as `.pkl` file.  
- Integrated model with Flask backend.  
- Connected React frontend with backend API.  

- Implemented:
  - Fraud classification  
  - Risk score  
  - Result display  

- Stored prediction history in MongoDB.  

**Guide Interaction:**  
Guide suggested improving explanation output and storing data.  

**Next Plan:**  
System testing.  

---

## 📅 Week 09: System Testing  
**Date:** 05/04/2026 – 27/04/2026   

- Tested:
  - Frontend input  
  - Backend response  
  - Model predictions  
  - MongoDB storage  

- Used real and fake internship data for validation.  

**Guide Interaction:**  
Guide suggested testing multiple scam scenarios.  

**Next Plan:**  
Result analysis.  

---

## 📅 Week 10: Results & Analysis  
**Date:** 28/04/2026 – 09/05/2026  

- XGBoost showed best performance among all models.  
- System successfully classified internships into categories.  

- Planned future enhancements:
  - Analyze real vs fake internships  
  - Identify scam patterns and resources  

**Guide Interaction:**  
Guide suggested adding analytical insights.  

**Next Plan:**  
Final documentation.  

---

## 📅 Week 11: Final Report & Conclusion  
**Date:** 09/05/2026 – 16/05/2026  

- Completed documentation and project report.  
- Prepared final presentation and demo.  
- Project implemented successfully.  

**Guide Interaction:**  
Guide approved final submission.  

**Next Plan:**  
Project evaluation.  

---

## 📌 Project Description  

InternShield AI is a web-based system that detects fraudulent internship postings using Machine Learning and NLP techniques.  

It:
- Takes internship details as input  
- Uses TF-IDF for feature extraction  
- Uses XGBoost model for prediction  
- Classifies internships into:
  - Genuine  
  - Suspicious  
  - Fraudulent  
- Provides risk score  
- Stores results in MongoDB  

Additionally, the system includes:  
- Analysis of real vs fake internships
- scam resources  

Future scope includes:
- Detecting fraud using internship offer letter images (image-based verification)  
- Integration with OCR for extracting text from documents  
- Browser extension for real-time internship verification  
- Integration with official company databases for validation
  
---

## 👥 Team Members  

- Gunjan Pravin Bhamare  
- Kunal Sudhakar Patil  
- Vrushali Machhindra Wadile  
- Utkarsh Vishnu Narkhede  

---

## 👩‍🏫 Guide  

- Prof. Sunetra P. Salunkhe  
