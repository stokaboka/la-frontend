<template>
  <div>
    <table cellspacing="0" cellpadding="0" class="rating-table">
      <tr class="rating_table_header">
        <td class="rating-table"  colspan="2" >Общеевропейская    Система Уровней Владения Иностранными Языками (CEF)</td>
        <td colspan="3" align="center" class="ratingTable_td">A1</td>
        <td colspan="2" align="center" class="ratingTable_td">A2</td>
        <td colspan="2" align="center" class="ratingTable_td">B1</td>
        <td colspan="2" align="center" class="ratingTable_td">B2</td>
        <td align="center" class="ratingTable_td" >C1</td>
        <td align="center" class="ratingTable_td" >C2</td>
      </tr>
      <tr>
        <td class="rating-table"  colspan="2" rowspan="2">Система Уровней Владения Иностранными Языками    Свободы Слова</td>
        <td colspan="2" align="center" class="ratingTable_td Beginner">Beginner</td>
        <td colspan="2" align="center" class="ratingTable_td Elementary">Elementary</td>
        <td colspan="2" align="center" class="ratingTable_td Pre-Intermediate">Pre-Intermediate</td>
        <td colspan="2" align="center" class="ratingTable_td Intermediate">Intermediate</td>
        <td colspan="2" align="center" class="ratingTable_td Upper-Intermediate">Upper-Intermediate</td>
        <td align="center" class="ratingTable_td Advanced">Advanced</td>
      </tr>
      <tr>
        <td align="center" class="ratingTable_td Beginner">Absolute</td>
        <td align="center" class="ratingTable_td Beginner">False</td>
        <td align="center" class="ratingTable_td Elementary">Entry</td>
        <td align="center" class="ratingTable_td Elementary">Confident</td>
        <td align="center" class="ratingTable_td Pre-Intermediate">Entry</td>
        <td align="center" class="ratingTable_td Pre-Intermediate">Confident</td>
        <td align="center" class="ratingTable_td Intermediate">Entry</td>
        <td align="center" class="ratingTable_td Intermediate">Confident</td>
        <td align="center" class="ratingTable_td Upper-Intermediate">Entry</td>
        <td align="center" class="ratingTable_td Upper-Intermediate">Confident</td>
        <td align="center" class="ratingTable_td Advanced">Competent</td>
      </tr>
      <tr class="rating_table_footer">
        <td class="rating-table" colspan="2">Баллы для    автоматического подсчета итогов тестирования</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="FinalRating_1">1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="FinalRating_84">8,4</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="FinalRating_171">17,1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="FinalRating_265">26,5</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="FinalRating_351">35,1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="FinalRating_447">44,7</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="FinalRating_541">54,1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="FinalRating_637">63,7</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="FinalRating_731">73,1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="FinalRating_837">83,7</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="FinalRating_100">&nbsp;</td>
      </tr>
      <tr>
        <td class="ratingTable_td part_header" colspan="13">ЧАСТЬ I: САМОСТОЯТЕЛЬНАЯ</td>
      </tr>
      <tr class="Vocabulary">
        <td class="rating-table" colspan="2">Лексика / Vocabulary</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Vocabulary_1">1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Vocabulary_2">2</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Vocabulary_3">3</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Vocabulary_4">4</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Vocabulary_5">5</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Vocabulary_6">6</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Vocabulary_7">7</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Vocabulary_8">8</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Vocabulary_9">9</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Vocabulary_10">10</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Vocabulary_11">*</td>
      </tr>
      <tr class="Grammar">
        <td class="rating-table" colspan="2">Грамматика / Grammar</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Grammar_0">0</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Grammar_1">1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Grammar_2">2</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Grammar_3">3</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Grammar_4">4</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Grammar_5">5</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Grammar_6">6</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Grammar_7">7</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Grammar_8">8</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Grammar_9">9</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle">*</td>
      </tr>
      <tr class="Listening">
        <td class="rating-table" colspan="2" >Восприятие на слух / Listening</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Listening_00">0</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Listening_01">0</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Listening_1">1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Listening_2">2</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Listening_3">3</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Listening_4">4</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Listening_5">5</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Listening_6">6</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Listening_7">7</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Listening_8">8</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Listening_9">*</td>
      </tr>
      <tr class="rating_table_footer">
        <td class="rating-table" colspan="2">Баллы для автоматического определения уровня (по письменной части)</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Part1_1">1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Part1_3">3</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Part1_6">6</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Part1_9">9</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Part1_12">12</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Part1_15">15</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Part1_18">18</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Part1_21">21</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Part1_24">24</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Part1_27">27</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Part1_100">&nbsp;</td>
      </tr>
      <tr class="rating_table_footer">
        <td class="rating-table" colspan="2">Сумма набранных    баллов по самостоятельной части тестирования (отражается балл и    соответствующий уровень):</td>
        <td class="ratingTable_td" colspan="11" id="PartOneTotal"></td>
      </tr>
      <tr>
        <td class="ratingTable_td part_header" colspan="13">ЧАСТЬ II: УСТНАЯ</td>
      </tr>
      <tr class="part_two_body">
        <td class="rating-table General_comment_on_oral_Assessment_Bands"  colspan="2" >Устное владение лексико-грамматическими компетентностями / General comment on oral Assessment Bands</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Rating_1_0">0</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Rating_1_4">0,4</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Rating_1_11">1,1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Rating_1_25">2,5</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Rating_1_31">3,1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Rating_1_47">4,7</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Rating_1_61">6,1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Rating_1_77">7,7</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Rating_1_91">9,1</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Rating_1_117">11,7</td>
        <td class="ratingTable_td" width="50" align="center" valign="middle" id="Rating_1_120">12,0</td>
      </tr>
      <tr class="part_two_body">
        <td class="rating-table Confidence_in_speaking"  colspan="2" >Уверенность и охотность при говорении / Confidence in speaking</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_2_0">0</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_2_1">1</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_2_2">2</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_2_3">3</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_2_4">4</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_2_5">5</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_2_6">6</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_2_7">7</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_2_8">8</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_2_9">9</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_2_10">10</td>
      </tr>
      <tr class="part_two_body">
        <td class="rating-table Speaking_rate" colspan="2" >Скорость речи / Speaking rate</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_3_0">0</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_3_1">1</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_3_2">2</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_3_3">3</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_3_4">4</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_3_5">5</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_3_6">6</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_3_7">7</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_3_8">8</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_3_9">9</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_3_10">10</td>
      </tr>
      <tr class="part_two_body">
        <td class="rating-table Using_of_cliche" colspan="2" >Языковые клише и стандартные фразы / Using of cliché</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_4_0">0</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_4_1">1</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_4_2">2</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_4_3">3</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_4_4">4</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_4_5">5</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_4_6">6</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_4_7">7</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_4_8">8</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_4_9">9</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_4_10">10</td>
      </tr>
      <tr class="part_two_body">
        <td class="rating-table Interactivity_of_speech" colspan="2" >Характер интерактивности речи / Interactivity of speech</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_5_0">0</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_5_1">1</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_5_2">2</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_5_3">3</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_5_4">4</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_5_5">5</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_5_6">6</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_5_7">7</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_5_8">8</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_5_9">9</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_5_10">10</td>
      </tr>
      <tr class="part_two_body">
        <td class="rating-table Using_of_the_Russian_language_in_speech" colspan="2" >Использование помощи русского в речи / Using of the Russian    language in speech</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_6_0">0</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_6_1">1</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_6_2">2</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_6_3">3</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_6_4">4</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_6_5">5</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_6_6">6</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_6_7">7</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_6_8">8</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_6_9">9</td>
        <td class="ratingTable_td btnSelectAnswer" width="50" align="center" valign="middle" id="Rating_6_10">10</td>
      </tr>
      <tr class="Phonetic_and_pronunciation">
        <td class="rating-table"  colspan="2" >Комментарий    к фонетике и произношению / Phonetic and pronunciation</td>
        <td class="ratingTable_td" colspan="11" ><select name="Rating_7" id="Rating_7" onChange="Main.setRating(document.getElementById('Rating_7'));">
          <option value="1">необходима работа над звуками</option>
          <option value="2">необходима работа над интонацией</option>
          <option value="3">необходима работа над фонетикой</option>
          <option value="4">рекомендована работа над фонетикой</option>
        </select></td>
      </tr>
      <tr class="rating_table_footer">
        <td class="rating-table" colspan="2" >Баллы для автоматического определения уровня (по устной части)</td>
        <td class="ratingTable_td" align="center" valign="middle" id="Rating_F2_0">0</td>
        <td class="ratingTable_td" align="center" valign="middle" id="Rating_F2_54">5,4</td>
        <td class="ratingTable_td" align="center" valign="middle" id="Rating_F2_111">11,1</td>
        <td class="ratingTable_td" align="center" valign="middle" id="Rating_F2_175">17,5</td>
        <td class="ratingTable_td" align="center" valign="middle" id="Rating_F2_231">23,1</td>
        <td class="ratingTable_td" align="center" valign="middle" id="Rating_F2_297">29,7</td>
        <td class="ratingTable_td" align="center" valign="middle" id="Rating_F2_361">36,1</td>
        <td class="ratingTable_td" align="center" valign="middle" id="Rating_F2_427">42,7</td>
        <td class="ratingTable_td" align="center" valign="middle" id="Rating_F2_491">49,1</td>
        <td class="ratingTable_td" align="center" valign="middle" id="Rating_F2_567">56,7</td>
        <td class="ratingTable_td" align="center" valign="middle" id="Rating_F2_620">62</td>
      </tr>
      <tr>
        <td class="rating-table" colspan="2">Сумма набранных баллов по устной части тестирования    (отражается балл и соответствующий уровень):</td>
        <td class="ratingTable_td" colspan="11" id="PartTwoTotal"></td>
      </tr>
      <tr>
        <td class="rating-table" colspan="13" id="levelDescription" style="padding: 5px;"></td>
      </tr>

    </table>
  </div>
</template>

<script>
export default {
  name: 'UserResultMatrix',
  data () {
    return {}
  }
}
</script>

<style scoped>
  /* CSS Document */

  .title_text{
    color:#FF0000;
  }

  .rating-table{
    border: 1px solid #666;
  }

  .ratingTable_td{
    border: 1px solid #666;
    text-align: center;
  }

  .rating_table_header, .rating_table_footer{
    background: #CCCC99;
  }

  .Beginner{
    background: #FFFF00;
  }

  .Elementary{
    background: #FFCC00;
  }

  .Pre-Intermediate{
    background: #00FF00;
  }

  .Intermediate{
    background: #00FFCC;
  }

  .Upper-Intermediate{
    background: #6699FF;
  }

  .Advanced{
    background: #3366CC;
  }

  .part_header{
    background: #CC33CC;
  }

  .Vocabulary{
    background:#CCCC66;
  }

  .Grammar{
    background:#FF9966;
  }

  .Listening{
    background:#CC9999;
  }

  .part_two_body{
    background: #CCDDFF;
  }

  .General_comment_on_oral_Assessment_Bands{
    background: #BBFFFF;
  }

  .Confidence_in_speaking{
    background: #AAFFFF;
  }

  .Speaking_rate{
    background:#AAEEFF;
  }

  .Using_of_cliche{
    background: #88EEFF;
  }

  .Interactivity_of_speech{
    background: #77DDFF;
  }

  .Using_of_the_Russian_language_in_speech{
    background: #66CCFF;
  }

  .Phonetic_and_pronunciation{
    background: #9CF;
  }

  .ratingSelectedCell{
    background:#FF0000;
    border: 2px solid #FF0;
  }
</style>
