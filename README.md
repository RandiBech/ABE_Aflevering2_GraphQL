# ABE_Aflevering2_GraphQL


Noter fra hjælp af Poul:
Udgangspunkt i demo, lektion 6: d06i-mutations:
- src/db/pg-clientjs svarer til vores models/db.js-fil
- schema/mutations er her hvor alle vores put og post metoder skal være - altså de metoder som ændrer noget i databasen
- schema/queries.js er her vores get-metoder skal være.
- index.js kan vi kopiere 1:1
- i server.js opsættes mutators og bruges i context
- db/pg-api.js er hvordan vores utils.js skal være. Poul sagde det giver mere mening at lave en fil, som her under db/ og ikke have utils til det.
- schema/mutations.js: det UserInput, som bruges her er en samling af de inputs, som skal bruges som parametre til resolve funktionen. UserInput er defineret i schema/types/input-user.js

Jeg har prøvet at ændre lidt i måden vi opsætter på, så det følger hans struktur mere.
-Randi