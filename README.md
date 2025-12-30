# NutriPlan - Meal Planner and Grocery Assistant

NutriPlan is a React-based web application designed to streamline the meal planning process and automate grocery list management. The application allows users to view meal plans, customize their shopping lists, and export them for offline use.

## Features

- **Interactive Shopping List**: Users can track their shopping progress with a real-time progress bar and checkable items.
- **Dynamic List Management**: A custom search and dropdown system allows for adding new ingredients, adjusting quantities, and removing items.
- **PDF Generation**: Integration with jsPDF enables users to export their customized shopping lists into a clean, printable PDF format.
- **Reusable Component Architecture**: Built using atomic design principles with a focus on reusable UI components and custom React hooks.
- **Responsive Design**: Optimized for various screen sizes, ensuring usability on both mobile and desktop devices.

## Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **PDF Export**: jsPDF, jspdf-autotable
- **State Management**: React Hooks (useState, useParams, custom hooks)

## Project Structure

- `src/components/ui`: Generic and reusable UI components.
- `src/hooks`: Custom React hooks for business logic (e.g., useShoppingList).
- `src/utils`: Helper functions and third-party integrations (e.g., PDF generation logic).
- `src/pages`: Main application views and page layouts.
- `src/data`: Mock data for initial development and testing.

## Installation

1. Clone the repository:
   git clone https://github.com/DarkoSerafinovski/NutriPlan.git

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

## Future Roadmap

- **Backend Integration**: Implementation of Supabase for user authentication and persistent data storage.
- **External API Integration**: Fetching nutritional data and ingredients from public food databases.
- **Localization**: Adding support for multiple languages including Serbian.
- **User Profiles**: Personalized meal planning and history tracking for registered users.
