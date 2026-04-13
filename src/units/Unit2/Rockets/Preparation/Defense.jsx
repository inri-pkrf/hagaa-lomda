function Defense() {
  return (
    <>
    <div>
      <h2 id='defense-headline'>כיצד נתגונן</h2>
      <img src={`${process.env.PUBLIC_URL}/assets/unitTwoImgs/questionIcon.png`} alt="Siren" id='alert-defense-icon'/>
      <p id='defense-text1'>סדר העדיפויות בכניסה למרחב מוגן</p>
      <p id='defense-text2'>נפעל בהתאם לזמן העומד לרשותנו ולפי סדר העדיפויות:</p>
      <div id='defense-list'>
        <p id='defense-text3'>
          <span id='defense-numbers1'>1.</span>
          מרחב מוגן
        </p>
        <p id='defense-text4'>
          <span id='defense-numbers2'>2.</span>
          מקלט
        </p>
        <p id='defense-text5'>
          <span id='defense-numbers3'>3.</span>
          חדר מדרגות פנימי
        </p>
        <p id='defense-text6'>
          <span id='defense-numbers4'>4.</span>
          חדר פנימי
        </p>
      </div>
      <p id='defense-text7'>תכנון קיבולת אדם למבנה</p>
      <p id='defense-text8'>
        יש להקצות 1.25 מ”ר לאדם במרחב מוגן.
        במוסדות חינוך יש להקצות 0.5 מ”ר למרחב מוגן.
      </p>
      <p id='defense-text9'>קומתי/דירתי</p>
      <p id='defense-text10'>משותף/ציבורי</p>


    </div>
   
   
    </>
  );
}




export default Defense;

