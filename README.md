# deadlines-cli
A CLI for setting up your Deadlines using NodeJS

### Usage
`node deadlines.js [args]`

Example: To show all deadlines this week for Chemistry<br>
`node deadlines.js --show=w --topic=Chemistry`

Example: To add a new deadline<br>
`node deadlines.js --add --title="Assignment 1" --date="Sept 10" --subject="Software"`


### For Easier Usage
#### On Mac/Linux
`alias deadlines=node deadlines.js`<br>
add it to your bashrc (or zshrc) file

#### On Windows
`doskey deadlines=node deadlines.js`<br>

then, you can easily use<br>
`deadlines [args]`
