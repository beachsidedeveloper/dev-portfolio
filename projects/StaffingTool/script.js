// Detailed station availability
const stations = {
  // Floor 1
  "1-2-01": true,
  "1-2-02": true,
  "1-2-03": true,
  "1-2-04": true,
  "1-2-05": true,
  "1-2-06": true,
  "1-2-07": true,
  "1-2-08": true,
  "1-2-09": true,
  "1-2-10": true,
  "1-2-11": true,
  "1-2-12": true,
  "1-2-13": true,
  "1-2-14": true,
  "1-2-15": true,
  "1-2-16": true,
  "1-2-17": true,
  "1-2-18": true,
  "1-4-01": true,
  "1-4-02": true,
  "1-4-03": true,
  "1-4-04": true,
  "1-4-05": true,
  "1-4-06": true,
  "1-4-07": true,
  "1-4-08": true,
  "1-4-09": true,
  "1-4-10": true,
  "1-4-11": true,
  "1-4-12": true,
  "1-4-13": true,
  "1-4-14": true,
  "1-4-15": true,
  "1-4-16": true,
  "1-4-17": true,
  // Floor 2
  "2-2-01": true,
  "2-2-02": true,
  "2-2-03": true,
  "2-2-04": true,
  "2-2-05": true,
  "2-2-06": true,
  "2-2-07": true,
  "2-2-08": true,
  "2-2-09": true,
  "2-2-10": true,
  "2-2-11": true,
  "2-2-12": true,
  "2-2-13": true,
  "2-2-14": true,
  "2-2-15": true,
  "2-2-16": true,
  "2-2-17": true,
  "2-2-18": true,
  "2-2-19": true,
  "2-2-20": true,
  "2-2-21": true,
  "2-2-01": true,
  "2-4-02": true,
  "2-4-03": true,
  "2-4-04": true,
  "2-4-05": true,
  "2-4-06": true,
  "2-4-07": true,
  "2-4-08": true,
  "2-4-09": true,
  "2-4-10": true,
  "2-4-11": true,
  "2-4-12": true,
  "2-4-13": true,
  "2-4-14": true,
  // Floor 3
  "3-2-01": true,
  "3-2-02": true,
  "3-2-03": true,
  "3-2-04": true,
  "3-2-05": true,
  "3-2-06": true,
  "3-2-07": true,
  "3-2-08": true,
  "3-2-09": true,
  "3-2-10": true,
  "3-2-11": true,
  "3-2-12": true,
  "3-2-13": true,
  "3-2-14": true,
  "3-2-15": true,
  "3-2-16": true,
  "3-2-17": true,
  "3-2-18": true,
  "3-2-19": true,
  "3-2-20": true,
  "3-2-21": true,
  "3-4-01": true,
  "3-4-02": true,
  "3-4-03": true,
  "3-4-04": true,
  "3-4-05": true,
  "3-4-06": true,
  "3-4-07": true,
  "3-4-08": true,
  "3-4-09": true,
  "3-4-10": true,
  "3-4-11": true,
  "3-4-12": true,
  "3-4-13": true,
  "3-4-14": true,
  "3-4-15": true,
  "3-4-16": true,
  "3-4-17": true,
  "3-4-18": true,
  // Floor 4
  "4-2-01": true,
  "4-2-02": true,
  "4-2-03": true,
  "4-2-04": true,
  "4-2-05": true,
  "4-2-06": true,
  "4-2-07": true,
  "4-2-08": true,
  "4-2-09": true,
  "4-2-10": true,
  "4-2-11": true,
  "4-2-12": true,
  "4-2-13": true,
  "4-2-14": true,
  "4-2-15": true,
  "4-2-16": true,
  "4-2-17": true,
  "4-2-18": true,
  "4-2-19": true,
  "4-2-20": true,
  "4-2-21": true,
  "4-4-01": true,
  "4-4-02": true,
  "4-4-03": true,
  "4-4-04": true,
  "4-4-05": true,
  "4-4-06": true,
  "4-4-07": true,
  "4-4-08": true,
  "4-4-09": true,
  "4-4-10": true,
  "4-4-11": true,
  "4-4-12": true,
  "4-4-13": true,
  "4-4-14": true,
  "4-4-15": true,
  "4-4-16": true,
  "4-4-17": true,
  "4-4-18": true,
};

let assignedStations = {};

document.addEventListener("DOMContentLoaded", () => {
  initializeFloorMaps();
  const barcodeInput = document.getElementById("barcode");
  barcodeInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
          event.preventDefault(); // Prevent default Enter behavior
          assignStation();
      }
  });

  document.querySelectorAll('.floor-selection input').forEach(checkbox => {
      checkbox.addEventListener('change', event => {
          const [floor, side] = event.target.id.split('-').slice(1);
          if (!event.target.checked) {
              unassignAllOnSide(floor, side);
          }
          initializeFloorMaps();
      });
  });
});

function initializeFloorMaps() {
  for (let floor = 1; floor <= 4; floor++) {
      const westSideCheckbox = document.getElementById(`floor-${floor}-west`);
      const eastSideCheckbox = document.getElementById(`floor-${floor}-east`);

      const westSide = document.querySelector(`#floor-${floor} .west`);
      const eastSide = document.querySelector(`#floor-${floor} .east`);

      clearSides(westSide, eastSide);

      Object.keys(stations).forEach(stationId => {
          const isWestSide = stationId.startsWith(`${floor}-2`);
          const isEastSide = stationId.startsWith(`${floor}-4`);
          if (isWestSide && westSideCheckbox.checked) {
              westSide.appendChild(createStationCell(stationId));
          } else if (isEastSide && eastSideCheckbox.checked) {
              eastSide.appendChild(createStationCell(stationId));
          }
      });
  }
}

function createStationCell(stationId) {
  const cell = document.createElement('div');
  cell.className = 'station-cell';
  cell.id = stationId;

  const barcode = Object.keys(assignedStations).find(key => assignedStations[key] === stationId);
  if (barcode) {
      cell.classList.add('assigned');
      cell.innerHTML = `${stationId} (${barcode}) <button onclick='unassignStation("${barcode}")'>X</button>`;
  } else {
      cell.textContent = stationId;
  }

  return cell;
}

function clearSides(westSide, eastSide) {
  westSide.innerHTML = '';
  eastSide.innerHTML = '';
}

function unassignAllOnSide(floor, side) {
  const sidePrefix = `${floor}-${side === 'west' ? '2' : '4'}`;
  Object.keys(stations).forEach(stationId => {
      if (stationId.startsWith(sidePrefix) && !stations[stationId]) {
          unassignStationByStationId(stationId);
      }
  });
}

function unassignStationByStationId(stationId) {
  const barcode = Object.keys(assignedStations).find(key => assignedStations[key] === stationId);
  if (barcode) {
      unassignStation(barcode, false);
  }
}

function assignStation() {
  const barcodeInput = document.getElementById("barcode");
  const barcode = barcodeInput.value.trim();

  if (!barcode) {
      showAlert("Please enter a barcode number.");
      return;
  }

  if (assignedStations[barcode]) {
      showAlert(`This employee is already assigned to station ${assignedStations[barcode]}.`);
      barcodeInput.value = "";
      return;
  }

  let availableStationId = Object.keys(stations).find(key => {
      const [floor, side] = key.split('-');
      const sideCheckbox = document.getElementById(`floor-${floor}-${side.startsWith('2') ? 'west' : 'east'}`);
      return stations[key] === true && sideCheckbox.checked;
  });

  if (availableStationId) {
      stations[availableStationId] = false;
      assignedStations[barcode] = availableStationId;

      const stationElement = document.getElementById(availableStationId);
      if (stationElement) {
          stationElement.classList.add('assigned');
          stationElement.innerHTML = `${availableStationId} (${barcode}) <button onclick='unassignStation("${barcode}", true)'>X</button>`;
      }

      barcodeInput.value = "";
  } else {
      showAlert("No stations available.");
  }
}

function unassignStation(barcode, showAlertMessage = true) {
  const stationId = assignedStations[barcode];
  if (stationId && stations[stationId] !== undefined) {
      stations[stationId] = true;
      delete assignedStations[barcode];

      const stationElement = document.getElementById(stationId);
      if (stationElement) {
          stationElement.classList.remove('assigned');
          stationElement.textContent = stationId;
      }

      if (showAlertMessage) {
          showAlert(`${barcode} has been unassigned from station ${stationId}.`);
      }
  } else {
      if (showAlertMessage) {
          showAlert(`No station found for employee ${barcode} to unassign.`);
      }
  }
}

function showAlert(message) {
  const alertElement = document.getElementById("alert");
  alertElement.textContent = message;
  alertElement.style.display = "block";

  setTimeout(() => {
    alertElement.style.display = "none";
  }, 3000);
}
