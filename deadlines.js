
const chalk = require('chalk')
const fs = require('fs')

const argv = require('yargs')
	.usage('$0 [args]')
	.option('show', { describe: 'show deadlines for Today(d) This Week(w) This Month(m) or All(a)'})
	.option('add', { describe: 'add a new deadline. append with --title=a --date=date --subject=subj'})
	.option('topic', { describe: 'filter deadlines by subject' })
	.argv;

let file = fs.readFileSync('./data.json');

let data = []

try {
        data = JSON.parse(file)
} catch(e) {
        data = []
}

const today = new Date()

function sort(arr) {

	for(let i = 0; i < arr.length - 1; i++) {
		for(let j = 0; j < arr.length - i -1; j++)
			{ var d1 = new Date(arr[j].date); var d2 = new Date(arr[j+1].date);
			  if(d1>d2)
				{
					let temp = arr[j]
					arr[j] = arr[j+1]
					arr[j+1] = temp;
				}
			}
	}

	fs.writeFile ("./data.json", JSON.stringify(arr), (err) => {if(err) throw err})

}

function show(d) {
	const date = new Date(d.date)
	var options = { weekday: 'long',  month: 'long', day: 'numeric' };
	console.log(chalk.hex("#adf7ff")(d.subject), chalk.hex("#f787ff")(d.title))
	console.log(chalk.hex("#fa5269")(`Due: ${date.toLocaleDateString("en-IN", options)}\n`))

}

function disp(data, choice) {
switch(choice) {
	case "d": 
		let flag1 = 0;
		console.log(chalk.bold("--- Deadlines For Today ---\n"))
		data.forEach((d) => {
			const dt = new Date(d.date);
			if(dt === today)
			{show(d); ++flag1;}
		})	
		if (flag1===0) 
			console.log("No Deadlines Found!\n")
		break;
	case "w": 
		var start = today - today.getDay()*24*60*60*1000
		var end = start + 7*24*60*60*1000
		let flag2 = 0;
                console.log(chalk.bold("--- Deadlines For This Week ---\n"))

		data.forEach((d) => {
                        const dt = new Date(d.date); 
			if(start<dt && dt<end)
			{  	show(d); ++flag2;}
		}
                );

		if (flag2===0)
                        console.log("No Deadlines Found!\n")

		break;
	case "m":
		let flag3 = 0;
                console.log(chalk.bold("--- Deadlines For This Month ---\n"))
 
		data.forEach((d) => {
                  	const dt = new Date(d.date);
                        if(dt.getMonth() === today.getMonth())
			{show(d); ++flag3;}
                })
		if (flag3===0)
                        console.log("No Deadlines Found!\n")

		 break;
	case "a":
		let flag4 = 0;
                console.log(chalk.bold("--- All Deadlines ---\n"))

		data.forEach((d) => {show(d); ++flag4;})
		if (flag4===0)
                        console.log("No Deadlines Found!\n")

		break;}
}

function add(title, date, subject) {
	let d = {}
	let today = new Date()
	d.title = title
	date = new Date(date)
	date.setYear(today.getYear())
	d.date = date
	d.subject = subject
	data.push(d)
	sort(data)
}

if(argv.show)
{       
	var data_new = data
	if(argv.topic)
	{
	data_new = []
        data.forEach((d) => {
                if(d.subject === argv.topic)
                        data_new.push(d)
        })
	}
	
	disp(data_new, argv.show)  
}

else {
	if(argv.topic)
        {
        data.forEach((d) => {
                if(d.subject === argv.topic)
                        show(d)
        })
        }
	
}


if(argv.del)
	data = []
	fs.writeFile ("./data.json", JSON.stringify(data), (err) => {if(err) throw err})

if(argv.add)
	add(argv.title, argv.date, argv.subject)

