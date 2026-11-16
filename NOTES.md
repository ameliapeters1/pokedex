## TASK ONE
- Check three things, and write the answers in your notes (a plain text file, as on earlier days):
1. What does the log print if you rename the variable to API_URL? Why?
it is undefined - you have to write VITE_ first or it wont show
2. What happens if you change the value in .env while the dev server is running?
it updates the server 
3. Everything in import.meta.env ends up in the bundle sent to the browser. What can that never contain? Does it matter for the PokéAPI, and why would it matter for your own API?
it can never contain confidential info. it doesnt matter for Pokemon since it is a public API already but in your own API there may be confidential information that you dont want to expose