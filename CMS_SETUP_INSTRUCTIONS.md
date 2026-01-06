# Decap CMS Setup Instructions for Mark Graphics Portfolio

## What You Now Have

I've set up a **Content Management System (CMS)** for your portfolio. This allows you to add new portfolio items through a web interface without editing code!

## Files Created

1. **admin/config.yml** - CMS configuration
2. **admin/index.html** - CMS admin panel
3. **content/portfolio/** - Folder where your portfolio data will be stored
4. **Updated index.html** - Added Netlify Identity widget

## How to Enable the CMS (One-Time Setup)

Since you're hosting on Vercel, you need to enable **Netlify Identity** (it's free and works with any host):

### Step 1: Enable Git Gateway

1. Go to **Netlify** (https://netlify.com) and sign up/login
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to your GitHub repository
4. Deploy the site on Netlify (this is ONLY for the CMS, your main site stays on Vercel)

### Step 2: Enable Identity & Git Gateway

1. In your Netlify dashboard, go to **Site settings** → **Identity**
2. Click **"Enable Identity"**
3. Under **Registration preferences**, select **"Invite only"** (recommended)
4. Scroll down to **Services** → **Git Gateway** and click **"Enable Git Gateway"**

### Step 3: Invite Yourself

1. Go to **Identity** tab
2. Click **"Invite users"**
3. Enter your email address
4. Check your email and accept the invitation
5. Set your password

## How to Use the CMS

### Accessing the Admin Panel

**Option 1:** Via Netlify
- Go to: `https://your-netlify-site.netlify.app/admin/`

**Option 2:** Via Vercel (after setup)
- Go to: `https://www.markgraphics.com/admin/`

### Adding New Portfolio Items

1. **Login** to the admin panel
2. Click **"Portfolio Items"** in the sidebar
3. Click **"New Portfolio Item"**
4. Fill in the fields:
   - **Title**: Project name (e.g., "Nike Logo Design")
   - **Description**: Short description
   - **Category**: Choose "branding" or "social"
   - **Project ID**: Unique identifier (lowercase, no spaces, e.g., "nike-logo")
   - **Featured Image**: Upload the main image
   - **Gallery Images**: Upload multiple images for the project
   - **Published**: Toggle on/off to show/hide
   - **Order**: Number to control position (lower = appears first)
5. Click **"Publish"**

### The CMS Will Automatically:
- ✅ Upload your images to GitHub
- ✅ Create a markdown file with your project data
- ✅ Commit changes to your repo
- ✅ Trigger Vercel to redeploy your site
- ✅ Your portfolio updates in ~1-2 minutes!

## Alternative: Quick Test Without Full Setup

If you want to test locally first:

1. Change the backend in `admin/config.yml` to:
   ```yaml
   backend:
     name: test-repo
   ```
2. Run a local server (e.g., `npx http-server` or Live Server extension)
3. Go to `http://localhost:8080/admin/`
4. You can add items (they won't save, but you can see how it works)

## Important Notes

- **No Database Needed** - Everything is stored in your GitHub repo
- **Free to Use** - Netlify Identity is free for up to 1,000 users
- **Your Vercel Site Stays** - You're just using Netlify for authentication
- **Images** are stored in `Images/uploads/` folder

## Troubleshooting

**Can't access /admin/ page?**
- Make sure files are committed to GitHub
- Clear browser cache
- Check that Netlify site is deployed

**Can't login?**
- Make sure Git Gateway is enabled in Netlify
- Check that you accepted the email invitation
- Try resetting your password

## Questions?

If you need help with setup, let me know!
