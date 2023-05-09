# A vue based browser based Family Feud frontend

## Run
Download, `npm install`, `npm run dev` - the usual.

Questions are (at the moment) only hardcoded in `src/stores/QuestionData.ts`, 
but there are plans to add an importer of csv data and maybe a view to add
questions by hand. 

In the web view (link is within the terminal) you can open the admin view in
a new tab and the state of the view is linked between the windows.

## Open todos

- [ ] Style the frontend a bit (make the crosses more visible, just make everything 
a bit nicer 
- [ ] Upload of csv files for questions and maybe a frontend to edit/add questions
- [x] Show number of answers for a question before showing the question text. This would be
original behavior of the game.
- [x] Deployment to gh pages ;)
- [x] Mark the players who buzzered last and who answered last
