# NPM Publishing with 2FA

## Your Error
```
403 Forbidden - Two-factor authentication or granular access token 
with bypass 2fa enabled is required to publish packages.
```

## Solution 1: Publish with 2FA Code (Easiest)

1. Open your authenticator app (Google Authenticator, Authy, etc.)
2. Get your 6-digit code
3. Run:
   ```bash
   npm publish --otp=123456
   ```
   (Replace 123456 with your actual code)

## Solution 2: Use Automation Token (For CI/CD)

If you need to automate publishing:

### Create an Automation Token:
1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click "Generate New Token"
3. Choose "Automation" (bypasses 2FA)
4. Copy the token

### Use the token:
```bash
# Set token in .npmrc
echo "//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE" > ~/.npmrc

# Publish
npm publish
```

## What's Ready to Publish

✓ **Package:** exp4j-candy@1.0.0  
✓ **Size:** 26.1 kB (188.8 kB unpacked)  
✓ **Files:** 42 files validated  
✓ **Contents:**
  - JavaScript bundle (88KB)
  - TypeScript definitions
  - Source files
  - Documentation

## After Publishing

Once published, users can install with:
```bash
npm install exp4j-candy
```

And use in JSweet projects:
```xml
<candy>exp4j-candy:1.0.0</candy>
```

## Quick Publish Now

```bash
# Get your 2FA code, then run:
npm publish --otp=YOUR_CODE
```

The package is ready - you just need the 2FA verification!
