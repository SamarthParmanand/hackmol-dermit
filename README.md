# Dermit

Dermit is a multi-modal AI application designed to provide a comprehensive diagnosis based on symptoms, leveraging both image and textual data. It offers a doctor-like experience by visually and verbally examining the patient, utilizing state-of-the-art machine learning models for image and text analysis.

## Features

- **Multi-Modal Diagnosis**: Dermit combines image and text analysis to provide a holistic diagnosis based on symptoms.
- **Image Analysis**: Utilizes LlamaIndex, Pinecone, and RAG architecture for image analysis and diagnosis.
- **Textual Analysis**: Employs fine-tuned Language Models (LLMs) for NLP-based diagnosis using textual data.
- **AWS S3 Integration**: Stores images securely in AWS S3 buckets for efficient retrieval and analysis.
- **Frontend Technologies**: Built with Next.js, NextUI, Tailwind CSS, TypeScript, Aceternity UI, and other modern frontend technologies.
- **Backend Infrastructure**: Utilizes Supabase for authorization and backend operations, ensuring secure and scalable application infrastructure.

## About

Dermit was developed as part of the "Hackmol 5.0" hackathon at the National Institute of Technology, Jalandhar, with contributions from Samarth Parmanand and Sheikh Taha Maroof.

## Technologies Used

- **Frontend**:

  - Next.js
  - NextUI
  - Tailwind CSS
  - TypeScript
  - Aceternity UI

- **Backend**:

  - Supabase
  - TypeScript
  - Pinecone

- **Machine Learning**:

  - LlamaIndex
  - RAG architecture
  - Mistral-instruct-v0.1
  - OpenAI GPT 3.5 Turbo
  - Roboflow

- **Cloud Services**:
  - AWS S3
  - AWS SageMaker
  - AWS EC2
  - AWS EC3
  - FastAPI
  - Vercel
  - Docker

## Development Setup

To set up the development environment for Dermit, follow these steps:

1. **Supabase Configuration**:

   - Obtain a Supabase Anon Key and Supabase Secret Key from the Supabase dashboard.
   - Set these keys as environment variables in your development environment.

2. **AWS S3 Configuration**:

   - Choose an AWS S3 region for storing images.
   - Create an S3 bucket for storing images.
   - Obtain an AWS Access Key ID and Secret Access Key with permissions to access the S3 bucket.
   - Set these credentials as environment variables in your development environment.

3. **Clone Repository**:

   ```bash
   git clone https://github.com/your-username/dermit.git
   ```

4. **Install Dependencies**:

   ```bash
   cd dermit
   npm install
   ```

5. **Run the Development Server**:

   ```bash
   npm run dev
   ```

6. **Access the Application**:
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Dermit application.

## Collaboration

To collaborate on Dermit, follow these steps:

1. Fork the repository: [https://github.com/your-username/dermit](https://github.com/your-username/dermit)
2. Clone the forked repository to your local machine: `git clone https://github.com/your-username/dermit.git`
3. Create a new branch for your changes: `git checkout -b feature/new-feature`
4. Make your changes and commit them: `git commit -m 'Add new feature'`
5. Push the changes to your fork: `git push origin feature/new-feature`
6. Create a Pull Request (PR) from your fork to the main repository's `master` branch.
7. Wait for the maintainers to review and merge your PR.

## Contributors

- Samarth Parmanand
- Sheikh Taha Maroof
