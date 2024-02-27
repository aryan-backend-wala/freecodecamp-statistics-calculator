const calculate = () => {
  const numbers = document.querySelector('#numbers').value.split(/,\s*/g);
  const filtered = numbers.map(num => Number(num)).filter(num => !isNaN(num));
  setElementTextContent('mean', getMean(filtered));
  setElementTextContent('median', getMedian(filtered));
  setElementTextContent('mode', getMode(filtered));
  setElementTextContent('range', getRange(filtered));
  setElementTextContent('variance', getVariance(filtered));
  setElementTextContent('standardDeviation', getStandardDeviation(filtered));
}

function setElementTextContent(id, value){
  document.querySelector(`#${id}`).textContent = value;
}

function getMean(array){
  return array.reduce((sum, num) => sum += num, 0) / array.length;
}

function getMedian(array){
  const sortedValues = array.sort((a, b) => a - b);
  const length = sortedValues.length;
  return (length % 2 === 0) ? (sortedValues[Math.floor((length/2) - 1)] + sortedValues[Math.floor(length/2)]) / 2 : sortedValues[Math.floor(length / 2)];
}

function getMode(array){
  const counts = {};
  array.forEach(el => {
    counts[el] = (counts[el] || 0) + 1;
  });
  if(new Set(Object.values(counts)).size === 1){
    return null;
  }
  const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  const mean = Object.keys(counts).filter((index) => counts[index] === counts[highest]);
  return mean.join(", ");
}

function getRange(array){
  return Math.max(...array) - Math.min(...array);
}

function getVariance(array){
  const mean = getMean(array);
  return array.reduce((sum, num) => {
    const difference = num - mean;
    const squared = difference ** 2;
    return sum + squared; 
  }, 0) / array.length;
}

function getStandardDeviation(array){
  const variance = getVariance(array);
  return Math.sqrt(variance);
}