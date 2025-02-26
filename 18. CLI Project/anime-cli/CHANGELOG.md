## Update and Delete Watchlist Entries [0.9.0]
- Command to refresh anime data from watchlist (e.g., from “Airing” to “Finished”) via Jikan  
- Logic for correctly identifying entries needing an update 
- Ability to remove a watchlist entry by clicking d while navigating list (with confirmation)
- Automatic re-indexing of watchlist after deletion   

## List Watchlist [0.8.0]
- Feature to list watchlist anime one entry at a time, using directional keys to control.
- Error handling for empty or malformed watchlist files.

## Add Anime to Watchlist [0.7.0]
- Ability to create a watchlist file if it doesn’t exist;
- Option to append selected anime details to the watchlist (in pretty print);
- Fixed pagination misbehavior;


## See Anime Info [0.6.0]
- Displays anime info when pressing the number in the keyboard corresponding to the number;
- Beautified the numbers;

## Search by Season [0.5.0]
- Command to retrieve and display the current anime season;
- Steamlined commands to avoid confusion: "--name <name>", "--genres", "--genres <genre1/genre2>, "--season";
- Fetches 18 animes at a time from the API, to a total listing of 81 (design choice to reach 9 pages out of 9);

## Search by Genre [0.4.0]
- CLI option to search anime by genre (up to two), ordered by ranking;
- CLI option to display all available genres;


## Paginated Results [0.3.0]
- Buffer/stream display showing 9 results per page;
- Navigation with number keys and keyboard arrows, 'q' to quit at any moment;

## Search by Name [0.2.0] 
- Core logic to query the Jikan API by anime name;
- Basic CLI prompts to handle search terms;
- Installed node_modules;
- Basic error handling;

## Project Scaffolding [0.1.0]
- Initial file structuring;
- NPM initialized;