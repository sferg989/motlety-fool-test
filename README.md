# TO START
- `npm install`
- `npm run dev`
- Go to http://localhost:3010/ 

# STATUS
- This Next 14 site has a homepage, company page, and article page. The site uses Tailwind CSS styling with a skeleton folder stucture.
- All code uses typescript, but no linter/prettier.
- All dynamic data comes from ApolloClient using mocked GQL data. On the server-side this has been moved into data/services that simulate a first time load time. For client-side, the ApolloProvider allows for useQuery hooks. Data includes:
  - A list of companies that the user is "watching" via a custom hook with simulate load delay.
  - A list of Motley UFO services owned by the user.
  - A list of top 5 companies with highest alien influence.
  - A list of latest articles about such companies.
  - Company specific data for one company - all company pages can show same data.
  - A single article with full data (more than in list) - all article pages can show same article.

# TASKS
1. Homepage performance.
    - There is a significant delay before much is displayed on the homepage. Improve this to reduce the delay or provide acceptable UI feedback. We have included the `react-loading-skeleton` as a starting point.
    - There can be a content shift when the users watched companies load. Improve that. Note: watches are loaded in a client component to setup task 2.

2. Watched Companies state.
    - Feel free to move/change how the watches data is loaded in the Watchlist component. Although this app is small, please add any 3rd-party state-management libraries you would like (e.g. Redux).
    - Wire up the "Watch" column buttons in the Ranked Companies table to add/remove that company from the "Watched" companies list. The Watched table should reflect changes, but this state does not need to persist to server. `instrumentId` is the PK for watching.
    - Going to the company or article page should also contain such a toggle that also reflects changes on the homepage and vise-versa. Note: only for the single company in the mocks.

3. Add in realtime quotes.
    - Using the quotes-service `getRealtimeQuotes`, how would you update the watch table to show Price and Changes for the table of Watches? Values don't need to be correct or match via `instrumentId`.

4. Company page path.
    - Update the CompanyLink component to also take an "exchange" parameter.
    - Update all usages to pass in "exchange" and have the resulting company page paths be `/company/<exchange>/<symbol>`.

5. Company page data.
    - Wire up the CompanyData to use dynamic data from Quote and QuoteFundamentals. 

6. TopNav frontend issues.
    - The Flying Saucer home button in the TopNav is not centered correctly on mobile (ex. iPhone 12).
    - Fix this. May require a single class addition or a rework of TopNav or site layout.
    - When on the homepage, change the Home link to be a non-link "Welcome".

7.  Got to an article page (click any article on home - all show same.)
    - Fix the body to display correctly as html (assume safe).
    - Change any company reference, `(CRYPTO: BTC)`, to CompanyLink to that exchange/symbol.







