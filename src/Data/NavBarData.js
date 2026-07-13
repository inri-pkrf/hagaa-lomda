const NavBarData = [
    {
        title: "יחידה 1 - מבוא",
        color: "#40d4ff",
        chapters: [
            { title: "פתיחה", path: "/unit-one-opening" },
            { title: "היערכות לאיומים", path: "/threats" },
            { title: "מצבי תפקוד", path: "/states" },
            { title: "ממשקים", path: "/interfaces",
                subChapters: [
                { title: "ממשקים ", path: "/interfaces" },
                { title: "שאלון ממשקים", path: "/interfaces-game" },
            ]
             },
            {
                title: "אוכלוסייה", path: "/population",
                subChapters: [
                    { title: "שיעור 1", path: "/populationInfo" },
                    { title: "שיעור 2", path: "/population-parts" },
                    { title: "שיעור 3", path: "/populationGame" }
                ]
            },
            { title: "שאלות סיכום", path: "/questions-end/1" },
            { title: "סיכום פרק", path: "/summary-checklist-unit1" },
        ]
    },  // נב בר יחידה 1 מוכן סופית
    {
        title: "יחידה 2 - שגרה",
        color: "#56C3A9",
        chapters: [
            { title: "פתיחה", path: "/unit-two-opening" },
             {
                title: "ירי טילים", path: "/rockets",
                subChapters: [
                    { title: "מאפייני האיום", path: "/info-rockets" },
                    {
                     title: "היערכות והתגוננות", path: "/preparation",
                    subChapters: [
                        { title: "כיצד המרחב המוגן שומר עלינו?", path: "/ProtectedSpace" },
                        { title: "התרעה", path: "/Alert" },
                        { title: "כיצד נתגונן?", path: "/Defense" },
                        { title: "בחירת מרחב מוגן", path: "/ChoosingSafeRoom" },
                        { title: "למה חשוב להמתין 10 דקות?", path: "/Wait10mins" },
                        { title: "ציוד ואחזקת מרחב מוגן", path: "/BuildingMaintenance" },
                    ]},
                    { title: " מרבים מוגנים", path: "/TimeToEnterMamad1" },
                    {
                    title: "מדיניות התגוננות", path: "/defense-policy/sub-one" ,
                    subChapters:[
                        { title: "מדיניות התגוננות- הסמכות החוקית", path: "/defense-policy/sub-one" },
                        { title: "מדיניות התגוננות- סרטון", path: "/defense-policy/sub-two" },
                    ]},
                    { title: "סיכום", path: "/summary-checklist-unit2-sub1" }
                ]
            },
            {
                title: "רעידת אדמה וצונאמי", path: "/earthquake",
                subChapters: [
                    { title: "מאפייני האיום", path: "/earthquake/info-earthquake" },
                    {
                         title: "היערכות והתגוננות", path: "/preparation-earth" ,
                      subChapters:[
                              { title: "כיצד נערכים לרעידת אדמה?", path: "/HowPreper" },
                              { title: "התנהגות נכונה- הנחיות מצילות חיים", path: "/RightBehavior" },
                              { title: "הנחיות לאחר רעידת אדמה", path: "/PostEarthquake" }
                        ]},
                    { title: "תרגיל אירוע", path: "/EarthquakeExercise" },
                    { title: "סיכום", path: "/summary-checklist-unit2-sub2" }
                ]
            },
            {
                title: "שרפה", path: "/fire",
                subChapters: [
                    { title: "מאפייני האיום", path: "/InfoFire" },
                    { title: "היערכות נכונה בשעת שרפה", path: "/PreparationFire" },
                    { title:"כללי התנהגות בשרפה", path: "/FireBehaviorIn" },
                   
                   
                    { title: "מה עושים בזמן שרפה?", path: "/LifeSavingFire" },
                    { title: "סיכום", path: "/summary-checklist-unit2-sub4" }
                ]
            },
            {
                 title: "חומרים מסוכנים", path: "/chemical",
                 subChapters: [
                    { title: "מאפייני האיום", path: "/InfoChemical",
                    subChapters:[
                              { title: "מאפייני האיום", path: "/InfoChemical" },
                              { title: "מאפייני האיום - סרטון", path: "/VideoChemical" },//להוסיף קובץ או לאחד
                        ]},
                    { title: "גורמים ודרכי חשיפה", path: "/CausesChemical" },
                    { title: "היערכות ומניעה", path: "/PreparationChemical" },
                    { title: "הנחיות", path: "/GuidelinesChemical" },
                    { title: "סיכום", path: "/summary-checklist-unit2-sub3" }
                ]
            },
            { title: "שאלות סיכום", path: "/questions-end/2" },
            { title: "סיכום פרק", path: "/summary-checklist-unit2" },


        ],
    },
    {  
        title: "יחידה 3 - שגרה",
        color: "#FFB356",
        chapters: [
            { title: "פתיחה", path: "/unit-three-opening" },
            {
                title: "צוותי חירום", path: "/EmergencyTeams",
                subChapters: [
                    { title: " למידה על הצוותים", path: "/DetailEmergencyTeams" },
                    { title: "שאלת סיכום", path: "/QuizEmergencyTeams" },
                    { title: "סיכום הפרק", path: "/summary-checklist-unit3-sub1" }
                ]
            },
            {
                title: " שמרטפיה", path: "/Education",
                subChapters: [
                    { title: " מבוא לשמרטפיות", path: "/EducationInfo" },
                    { title: "משחק שמרטפיות", path: "/EducationGame" },
                    { title: "סיכום הפרק", path: "/summary-checklist-unit3-sub2" }
                ]
            },
            {
                title: "משאבים", path: "/Resources",
                subChapters: [
                    { title: " מבוא למשאבים", path: "/ResourcesInfo" },
                    { title: "משחק משאבים", path: "/ResourcesGame" },
                    { title: "סיכום הפרק", path: "/summary-checklist-unit3-sub3" }
                ]
            },
            {
                title: "מגויסי חוץ ", path: "/ExternalRecruits",
                subChapters: [
                    { title: " מבוא למגויסי חוץ", path: "/ExternalInfo" },
                    { title: " כוח אדם", path: "/ManPower" },
                    { title: "שאלת סיכום", path: "/ExternalRecruitsQuestion" },
                    { title: "סיכום הפרק", path: "/summary-checklist-unit3-sub4" }
                ]
            },
            {
                title: " תיק מפעל", path: "/FactoryFile",
                subChapters: [
                    { title: " שימושים", path: "/UsesFactoryFile" },
                    { title: "שאלת סיכום", path: "/QuestionFactoryFile" },


                ]
            },


            { title: "שאלות סיכום", path: "/questions-end/3" },
            { title: "סיכום פרק", path: "/summary-checklist-unit3" },
        ]
    },
    {
        title: "יחידה 4 - חירום",
        color: "#E2787A",
        chapters: [
            { title: "פתיחה", path: "/unit-four-opening" },
            {
                title: "מצבים משפטיים", path: "/Sub1Legal",
                subChapters: [
                    { title: " מצבי יסוד", path: "/Sub1Legal" },
                    { title: "השוני והדמיון בין המצבים", path: "/Sub2Legal" },
                    { title: "משחק גרירה", path: "/GameLegalSituation" },
                ]
            },
            {
                title: " מעבר משגרה לחירום", path: "/ExplainationRTE",
                subChapters: [
                    { title: 'פעולות לקידום המוכנות', path: "/ExplainationRTE" },
                    { title: "שאלת סיכום", path: "/QuestionRTE" },
                ]
            },
            { title: "אירוע חירום", path: "/ExplainEmergency" },
            { title: "שאלות סיכום", path: "/questions-end/4" },
            { title: "סיכום פרק", path: "/summary-checklist-unit4" },
        ]
    },
];
















export default NavBarData;





































