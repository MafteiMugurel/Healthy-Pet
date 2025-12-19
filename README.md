# HealthyPet Web Aplication

A web application or managing pets and their medical records.
The app allows users to add pets, view pet details, and manage medical information through a clean and modular React interface.

## Features

- **Pet Management**
  - Add new pets
  - View pet details
- **Medical Records**
  - Add vaccinations
  - Add consultations
  - Add lab / blood work records
- **Dashboard**
  - Card-based layout
  - Quick access to pet actions
- **Modular UI**
  - Page-based architecture
  - Reusable components
- **Clean Styling**
  - Separate SCSS files
  - No inline or TSX-based CSS

## Tech Stack

### Frontend
- **React**
- **TypeScript**
- **SCSS**
- **Material UI**
- **Day.js**

## Prerequisites

Before running the project, make sure you have:

- **Node.js** (v24 or higher)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd healthy-pet
```

### 2. Install Dependencies

```bash
npm install
```

### Start the Frontend Development Server

From the `client` directory (in a new terminal):

```bash
npm start
```

The React app will start on `http://localhost:3000` and should automatically open in your browser.

## Usage

### 1. Create an Account

- Navigate to `http://localhost:3000`
- Click on "Register"
- Enter your email and password
- Click "Sign Up" to create your account

### 2. Log In

- Enter your credentials on the login page
- Click "Login"
- You'll be redirected to the dashboard upon successful authentication

### 3. Create a Profile For Your Pet

- On the dashboard, create a profile for your pet by clicking "Add new animal"
- Insert your pet details:
   - Animal type
   - Animal name
   - Breed
   - Species
   - Birthdate
   - Gender
   - Weight
   - Coloring
   - Microchip/ID number

Then, you can Add medical records for your pet by clicking "ADD MEDICAL RECORDS" or you can add them later and just Save the details that you already put by clicking "SAVE AND EXIT"

### 4. Add Medical Records

After you finish to add yor pet, you can click "ADD DATA"  and choose which type of data you want to add for your pet like:
 - Vaccine
 - Consultation
 - BloodWork

After you finish, just click "SAVE AND EXIT"
Later, you can update or delete datas from your pet profile by clicking "VIEW"

### 5. View Pet

By clicking "VIEW" you can update general or delete general information from your pet like:
   - Animal name
   - Breed
   - Species
   - Birthdate
   - Gender
   - Weight
   - Coloring
   - Microchip/ID number

Also, you can see here details about next consultations, lab results and vaccinations for your pet
## Project Structure

```bash
src/pages/  
├─ add-animal/  
│  ├─ add-animal.tsx  
│  ├─ add-animal.scss  
│  └─ add-medical/  
│     ├─ add-medical.tsx  
│     └─ add-medical.scss  
│  
├─ dashboard/  
│  ├─ dashboard.tsx  
│  ├─ dashboard.scss  
│  ├─ card/  
│  │  ├─ card.tsx  
│  │  └─ card.scss  
│  └─ card-add/  
│     ├─ card-add.tsx  
│     └─ card-add.scss  
│  
├─ homepage/  
│  ├─ homepage.tsx  
│  └─ homepage.scss  
│  
└─ view-animal/  
   ├─ view-animal.tsx  
   └─ view-animal.scss
```

Each page follows a consistent structure:
- 1 TSX file for logic & layout
- 1 SCSS file for styling

## Available Scripts

npm run dev – start development server  
npm run build – build for production  
npm run preview – preview production build

## License

See the LICENSE file for details.

## Author

Mugurel Maftei & Adi Istrate















