# DAPFY.COM - Digital Marketplace

DAPFY.COM is a secure digital marketplace where users can buy and sell digital products. It serves as a one-stop shop for digital goods, providing a platform for e-commerce transactions in the digital realm.

## Technologies Used

- [Next.js](https://nextjs.org/) (with App Router)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Zod](https://github.com/colinhacks/zod)
- [React Hook Form](https://react-hook-form.com/)

## Getting Started

### Prerequisites

- Node.js (version 20.17)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dapfycom/dapfy-market-fe.git
   cd dapfy-market-fe.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy the `.env.example` file to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Open `.env.local` and fill in the necessary values for each environment variable.

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/app - Next.js App Router pages and layouts
/components - Reusable React components
  /ui - UI components (e.g., Toaster)
/providers - Context providers (e.g., RootProvider)
/styles - Global styles (globals.css)
/public - Static assets
```

## Key Features

- Secure platform for buying and selling digital products
- User-friendly interface for easy navigation and transactions
- Responsive design using Tailwind CSS and the Inter font
- Toast notifications for improved user feedback

## Performance Optimization

This project follows best practices for performance optimization:

- Utilizes React Server Components (RSC) to minimize client-side JavaScript
- Implements dynamic loading for non-critical components
- Optimizes images using WebP format and lazy loading
- Uses Tailwind CSS for efficient styling

## SEO and Metadata

The project includes comprehensive metadata for improved SEO:

- Title: "DAPFY.COM - Digital Marketplace"
- Description: "Buy and sell digital products securely on DAPFY.COM. Your one-stop shop for digital goods."
- Keywords: "digital marketplace, e-commerce, digital products, online shopping"
- OpenGraph data for better social media sharing

## Deployment on Vercel

To deploy this project on Vercel, follow these steps:

1. Ensure your project is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

2. Sign up or log in to [Vercel](https://vercel.com).

3. Click "New Project" and import your Git repository.

4. Configure the project settings:
   - Framework Preset: Next.js
   - Root Directory: ./ (or your project root)
   - Build Command: (leave as default)
   - Output Directory: (leave as default)

5. Set up environment variables:
   - In the Vercel dashboard, go to your project settings.
   - Navigate to the "Environment Variables" section.
   - Add all variables from your `.env.example` file, providing actual values for the production environment.

6. Click "Deploy" to start the deployment process.

7. Once deployed, Vercel will provide you with a URL for your live application.

### Continuous Deployment

Vercel automatically sets up continuous deployment. Future pushes to your main branch will trigger new deployments.

### Custom Domains

To add a custom domain:
1. In the Vercel dashboard, go to your project settings.
2. Navigate to the "Domains" section.
3. Add and configure your custom domain.


For more detailed information, refer to the [Vercel Documentation](https://vercel.com/docs).

## Contributing

We welcome contributions to improve DAPFY.COM. Please read our contributing guidelines before submitting pull requests.


