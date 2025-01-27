Live link: https://midnattlantern.github.io/tech-silver-list

Tech Silver List was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Theme font:
``` css
{
font-family: 'Ewert', cursive;
}
```

Tech Silver List is deployed to GitHub pages by following these steps:
1. Install gh-pages Package:
bash:
`npm install gh-pages --save-dev`

2. Add homepage in package.json:
`  "homepage": "https://midnattlantern.github.io/tech-silver-list/"`

3. Add inside scripts of package.json:
`  "predeploy": "npm run build",`
`  "deploy": "gh-pages -d build"`

4. Bash in terminal:
`npm run build`
`npm run deploy`

Deployment takes a few minutes before showing up.

Animations
---
The Silver List Technological project initially tried using css keyframes to create ambient animations for SVG elements, but due to excessive GPU usage, this approact put the risk of overworking the hardware and was therefore scratched.

Debug on phone
---
To check that the app is usable on the phone, a real iPhone was used, pasing the local IP address to a web-browser.