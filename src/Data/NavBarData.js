const NavBarData = [
    {
        title: "יחידה 1 - מבוא",
        color: "#40d4ff",
        chapters: [
            { title: "פתיחה", path: "/unit-opening/UnitOne" },
            { title: "מטרות", path: "/goals" },
            { title: "היערכות לאיומים", path: "/threats" },
            { title: "מצבי תפקוד", path: "/states" },
            { title: "ממשקים", path: "/interfaces" },
            {
                title: "אוכלוסיה", path: "/population",
                subChapters: [
                    { title: "שיעור 1", path: "/populationInfo" },
                    { title: "שיעור 2", path: "/population-parts" },
                    { title: "שיעור 3", path: "/populationGame" }
                ]
            },
            { title: "שאלות סיכום", path: "/questions-end" },
            { title: "סיכום פרק", path: "/summary-checklist" },
        ]
    },
    {
        title: "יחידה 2 - שגרה",
        color: "#56C3A9",
        chapters: [
            { title: "פתיחה", path: "/unit-opening/UnitTwo" },
            { title: "מטרות", path: "/goals" },
             {
                title: "ירי טילים", path: "/rockets",
                subChapters: [
                    { title: "מאפייני האיום", path: "/info-rockets" },
                    {
                     title: "היערכות והתגוננות", path: "/preparation",
                    subChapters: [
                        { title: "כיצד המרחב המוגן שומר עלינו?", path: "/preparation-info" },
                        { title: "התרעה", path: "/alert" },
                        { title: "כיצד נתגונן?", path: "/defense" },
                        { title: "בחירת מרחב מוגן", path: "/choosing-safe-room" },
                        { title: "למה חשוב להמתין 10 דקות?", path: "/wait-10-mins" },
                        { title: "ציוד ואחזקת מרחב מוגן", path: "/equipment-outside-game" },
                    ]},
                    { title: "מרחבים מוגנים", path: "/protected-space" },
                    {
                         title: "מדיניות התגוננות", path: "/defense-policy" ,
                        subChapters:[
                              { title: "מדיניות התגוננות- הסמכות החוקית", path: "/sub-one-defense-policy" },
                              { title: "מדיניות התגוננות- סרטון", path: "/sub-two-defense-policy" },
                              { title: "זמן כניסה  למרחב המוגן", path: "/entryTime" }
                        ]},
                    { title: "תרגול מרבים מוגנים", path: "/safe-room-exercise" },
                    { title: "סיכום", path: "/summary-checklist-two" } //לשנות גם בשם של הקובץ כדי שלא יהיו כפילויות עם יחידה 1
                ]
            },
            {
                title: "רעידת אדמה וצונאמי", path: "/earthquake",
                subChapters: [
                    { title: "מאפייני האיום", path: "/info-earthquake" },
                    {
                         title: "היערכות והתגוננות", path: "/preparation-earth" ,//לשנות בקובץ גם לearthquake
                      subChapters:[
                              { title: "כיצד נערכים לרעידת אדמה?", path: "/how-preper" },
                              { title: "התנהגות נכונה- הנחיות מצילות חיים", path: "/video=preper-earth" },//סרטון של ההנחיות
                              { title: "הנחיות לאחר רעידת אדמה", path: "/post-earthquake" }
                        ]},
                    { title: "תרגיל אירוע", path: "/earthquake-exercise" },
                    { title: "סיכום", path: "/summary-checklist-two" } //לשנות גם בשם של הקובץ כדי שלא יהיו כפילויות עם יחידה 1
                ]
            },
               {
                 title: "חומרים מסוכנים", path: "/chemical",
                 subChapters: [
                    { title: "מאפייני האיום", path: "/info-chemical",
                    subChapters:[
                              { title: "מאפייני האיום", path: "/info-chemical" },
                              { title: "מאפייני האיום - סרטון", path: "/video-chemical" },//להוסיף קובץ או לאחד
                        ]},
                    { title: "גורמים", path: "/causes-chemical" },
                    { title: "דרכי חשיפה", path: "/exposure-chemical" },
                    { title: "היערכות ומניעה", path: "/preparation-chemical" },
                    { title: "הנחיות", path: "/chemical-guidelines" },
                    { title: "סיכום", path: "/summary-checklist-two" } //לשנות גם בשם של הקובץ כדי שלא יהיו כפילויות עם יחידה 1
                ]
            },
               {
                title: "שריפה", path: "/fire",
                subChapters: [
                    { title: "מאפייני האיום", path: "/info-fire" },
                    { title: "היערכות נכונה בשעת שריפה", path: "/preparation-fire" },
                    { title: "כללי התנהגות בשריפה במצב שבו ניתן לצאת מהמבנה", path: "/fire-behavior-out" },
                    { title: "כללי התנהגות בשריפה במצב שבו לא ניתן לצאת מהמבנה", path: "/fire-behavior-in" },
                    { title: "מה עושים בזמן שריפה?", path: "/fire-behavior" },
                    { title: "סיכום", path: "/summary-checklist-two" } //לשנות גם בשם של הקובץ כדי שלא יהיו כפילויות עם יחידה 1
                ]
            },
            { title: "שאלות סיכום", path: "/questions-end" },
            { title: "סיכום פרק", path: "/summary-checklist" },
        ]
    },
];


export default NavBarData;

