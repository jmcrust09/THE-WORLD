// Code.gs - Con doGet para aplicación web y menú opcional

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Dashboard')
    .addItem('Abrir Dashboard', 'showDashboard')
    .addToUi();
}

function showDashboard() {
  var html = HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Sistema de Monitoreo de Hábitos')
    .setWidth(1300)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'Dashboard Robótico');
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Sistema de Monitoreo de Hábitos')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getDashboardData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Base de Datos');
  if (!sheet) throw new Error('No se encontró la hoja "Base de Datos"');
  
  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1); // omitir encabezados
  
  const persons = {};
  
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const name = row[0];
    if (!name) continue;
    
    const day = row[1];
    let hourRange = row[2];
    const activity = row[3];
    const category = row[4];
    // Leer realizado: puede ser booleano o string
    let realizado = row[5];
    if (typeof realizado === 'string') realizado = realizado.toUpperCase() === 'TRUE';
    else realizado = !!realizado;
    
    if (!activity) continue;
    
    if (!persons[name]) {
      persons[name] = {
        activities: {},
        dayPoints: {},
        timeline: []
      };
    }
    
    const person = persons[name];
    
    // Contar actividades
    if (!person.activities[activity]) {
      person.activities[activity] = {
        category: category || 'Deseable',
        total: 0,
        completions: 0
      };
    }
    person.activities[activity].total++;
    if (realizado) person.activities[activity].completions++;
    
    // Puntos por día (solo realizadas)
    if (realizado && day) {
      let points = 0;
      if (category === 'Indispensable') points = 3;
      else if (category === 'Necesaria') points = 2;
      else if (category === 'Deseable') points = 1;
      if (person.dayPoints[day]) person.dayPoints[day] += points;
      else person.dayPoints[day] = points;
    }
    
    // Timelime para Gantt (si tiene rango de horas)
    if (hourRange && typeof hourRange === 'string' && hourRange.includes(' a ')) {
      const parts = hourRange.split(' a ');
      let startHour = parseInt(parts[0], 10);
      let endHour = parseInt(parts[1], 10);
      if (!isNaN(startHour) && !isNaN(endHour)) {
        // Si la hora de fin es 24, la tratamos como 0 del día siguiente (para el frontend)
        person.timeline.push({
          day: day,
          start: startHour,
          end: endHour,
          activity: activity,
          category: category,
          done: realizado
        });
      }
    }
  }
  
  // Procesar resultados por persona
  const results = [];
  for (const name in persons) {
    const person = persons[name];
    const activities = person.activities;
    
    let maxCount = -1, topHabits = [];
    let minCount = Infinity, bottomHabits = [];
    const improvementList = [];
    
    for (const act in activities) {
      const completions = activities[act].completions;
      if (completions > maxCount) { maxCount = completions; topHabits = [act]; }
      else if (completions === maxCount) topHabits.push(act);
      
      if (completions < minCount) { minCount = completions; bottomHabits = [act]; }
      else if (completions === minCount) bottomHabits.push(act);
      
      const failures = activities[act].total - completions;
      if (failures > 0) {
        improvementList.push({
          name: act,
          category: activities[act].category,
          failures: failures,
          total: activities[act].total
        });
      }
    }
    
    // Orden por categoría
    const catOrder = { 'Indispensable': 1, 'Necesaria': 2, 'Deseable': 3 };
    improvementList.sort((a,b) => {
      const diff = (catOrder[a.category] || 4) - (catOrder[b.category] || 4);
      if (diff !== 0) return diff;
      return b.failures - a.failures;
    });
    const topImprovements = improvementList.slice(0,3);
    
    let bestPoints = -1, bestDays = [];
    for (const day in person.dayPoints) {
      const pts = person.dayPoints[day];
      if (pts > bestPoints) { bestPoints = pts; bestDays = [day]; }
      else if (pts === bestPoints) bestDays.push(day);
    }
    
    results.push({
      name: name,
      activities: person.activities,
      dayPoints: person.dayPoints,
      timeline: person.timeline,
      topHabit: { activities: topHabits, count: maxCount === -1 ? 0 : maxCount },
      bottomHabit: { activities: bottomHabits, count: minCount === Infinity ? 0 : minCount },
      bestDay: { days: bestDays, points: bestPoints === -1 ? 0 : bestPoints },
      habitsToImprove: topImprovements
    });
  }
  
  return { users: results, allActivities: [] };
}