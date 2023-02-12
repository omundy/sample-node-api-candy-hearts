
# AI Candy Heart Generator

<img src="public/assets/img/heart-3.png" width="100px"> <img src="public/assets/img/heart-1.png" width="100px"> <img src="public/assets/img/heart-4.png" width="100px"> <img src="public/assets/img/heart-2.png" width="100px"> <img src="public/assets/img/heart-5.png" width="100px"> <img src="public/assets/img/heart-11.png" width="100px"> <img src="public/assets/img/heart-8.png" width="100px"> <img src="public/assets/img/heart-6.png" width="100px"> 


## Tutorial

### 1. Generate project

```bash
# generate project
npx express-generator --view=hbs sample-api-candy-hearts
# change directory
cd sample-api-candy-hearts
# open in VS Code
code .
# install modules
npm install
# run the app
DEBUG=sample-api-candy-hearts:* nodemon start
```



### 2. Track with Git

[.gitignore](https://www.toptal.com/developers/gitignore/api/node,macos,windows)

```bash
# make a git repo
git init
# add .gitignore, paste from link above
touch .gitignore
# first commit
git add .
git commit -m "First commit"
```


### 3. Edit views

1. Add Bootstrap to `views/layout.hbs` using their [quickstart](https://getbootstrap.com/docs/5.3/getting-started/introduction/#quick-start)
1. Delete content inside `public/stylesheets/style.css`


### 4. Create API

1. Replace all occurances of the word "users" with "api" across the whole project (Command+Shift+F) including the filename of `routes/users.js`
1. Open `routes/api.js` and replace line 6 `res.send(...)` with `res.json({ "message": "hello, world!" });` 
1. Got to http://localhost:3000/api to test


### 5. Publish

1. Commit and push all your changes to Github
1. Create vercel.com account (using Github)
1. Add Project
1. Import your repository
1. Click Deploy