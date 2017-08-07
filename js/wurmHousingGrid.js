//Functions
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//diagnosticMessages prints messages to the console useful for
//debugging.
function diagnosticMessages(clickedOn, enabled) {
    if(!enabled) return;

    let myRowMessage = 'My Row is ' + (clickedOn.myRow + 1);
    console.log(myRowMessage);
    let myColMessage = 'My Column is ' + (clickedOn.myCol + 1);
    console.log(myColMessage);

    let gridSlot = hGridArray[clickedOn.myRow][clickedOn.myCol];
    if(gridSlot == null) {
        console.log("This slot was undefined!");
        return;
    }
    let myGridMessage = "This had " + gridSlot + " in it.";
    console.log(myGridMessage);
}

//changeRequirements updates the text on the page describing the
//required materials.
function changeRequirements(clickedOn, isInitial, isAdding) {
    if(isInitial) {
        carpentrySkill = 5;

        mySuppliesNeeded[0] = 80;
        mySuppliesNeeded[1] = 4;
        mySuppliesNeeded[2] = 8;
        mySuppliesNeeded[3] = 10;
        mySuppliesNeeded[4] = 90;
        mySuppliesNeeded[5] = 90;

        document.getElementById("carpentry").innerHTML =
            "Carpentry Required For Wooden House: " + carpentrySkill;
        document.getElementById("planks").innerHTML =
            "Planks: " + mySuppliesNeeded[0];
        document.getElementById("largenails").innerHTML =
            "Large Nails: " + mySuppliesNeeded[1];
        document.getElementById("smallnails").innerHTML =
            "Small Nails: " + mySuppliesNeeded[2];
        document.getElementById("woodenshingles").innerHTML =
            "Wooden Shingles: " + mySuppliesNeeded[3];

        document.getElementById("masonry").innerHTML =
            "Masonry Required for Stone House: " + masonrySkill;
        document.getElementById("stonebricks").innerHTML =
            "Stone Bricks: " + mySuppliesNeeded[4];
        document.getElementById("mortar").innerHTML =
            "Mortar: " + mySuppliesNeeded[5];
        return;
    }

    if(!buildingPlaced) {
        carpentrySkill = 0;

        mySuppliesNeeded[0] = 0;
        mySuppliesNeeded[1] = 0;
        mySuppliesNeeded[2] = 0;
        mySuppliesNeeded[3] = 0;
        mySuppliesNeeded[4] = 0;
        mySuppliesNeeded[5] = 0;

        document.getElementById("carpentry").innerHTML =
            "Carpentry Required For Wooden House: " + carpentrySkill;
        document.getElementById("planks").innerHTML =
            "Planks: " + mySuppliesNeeded[0];
        document.getElementById("largenails").innerHTML =
            "Large Nails: " + mySuppliesNeeded[1];
        document.getElementById("smallnails").innerHTML =
            "Small Nails: " + mySuppliesNeeded[2];
        document.getElementById("woodenshingles").innerHTML =
            "Wooden Shingles: " + mySuppliesNeeded[3];

        document.getElementById("masonry").innerHTML =
            "Masonry Required for Stone House: " + 0;
        document.getElementById("stonebricks").innerHTML =
            "Stone Bricks: " + mySuppliesNeeded[4];
        document.getElementById("mortar").innerHTML =
            "Mortar: " + mySuppliesNeeded[5];
        return;
    }

    //I added one to the side count to incorporate a new floor.
    if(isAdding) {
        let sideCount = getConnectedCount(clickedOn);

        carpentrySkill += 5 - (sideCount + 1);
        mySuppliesNeeded[0] += (80 - (20 * (sideCount + 1)));
        mySuppliesNeeded[1] += (4 - (sideCount + 1));
        mySuppliesNeeded[2] += 4;
        mySuppliesNeeded[3] += 10;
        mySuppliesNeeded[4] += (90 - (20 * (sideCount + 1)));
        mySuppliesNeeded[5] += (90 - (20 * (sideCount + 1)));
    } else {
        let sideCount = getConnectedCount(clickedOn);

        carpentrySkill -= 5 - (sideCount + 1);
        mySuppliesNeeded[0] -= (80 - (20 * (sideCount + 1)));
        mySuppliesNeeded[1] -= (4 - (sideCount + 1));
        mySuppliesNeeded[2] -= 4;
        mySuppliesNeeded[3] -= 10;
        mySuppliesNeeded[4] -= (90 - (20 * (sideCount + 1)));
        mySuppliesNeeded[5] -= (90 - (20 * (sideCount + 1)));
    }

    document.getElementById("carpentry").innerHTML =
        "Carpentry Required For Wooden House: " + carpentrySkill;
    document.getElementById("planks").innerHTML =
        "Planks: " + mySuppliesNeeded[0];
    document.getElementById("largenails").innerHTML =
        "Large Nails: " + mySuppliesNeeded[1];
    document.getElementById("smallnails").innerHTML =
        "Small Nails: " + mySuppliesNeeded[2];
    document.getElementById("woodenshingles").innerHTML =
        "Wooden Shingles: " + mySuppliesNeeded[3];
    document.getElementById("stonebricks").innerHTML =
        "Stone Bricks: " + mySuppliesNeeded[4];
    document.getElementById("mortar").innerHTML =
        "Mortar: " + mySuppliesNeeded[5];
}

//getConnectedCount returns the number of connected blocks relative
//to the one selected by the user.
function getConnectedCount(clickedOn) {
    //-1 is returned as a special case, indicating that it's the first
    //block, which requires no further inspection.
    if(!buildingPlaced) {
        buildingPlaced = true;
        return -1;
    }

    let myRow = clickedOn.myRow;
    let myCol = clickedOn.myCol;
    let noLeft = false;
    let noRight = false;
    let noUp = false;
    let noDown = false;
    let sideCount = 0;

    if(myRow - 1 < 0) noLeft = true;
    if(myRow + 1 > 20) noRight = true;
    if(myCol - 1 < 0) noDown = true;
    if(myCol + 1 > 20) noUp = true;

    let normalSideValid = false;
    if(!noLeft) {
        let gridSlot = hGridArray[myRow - 1][myCol];
        if(gridSlot >= 1) {
            normalSideValid = true;
            sideCount++;
        }
    }

    if(!noRight) {
        let gridSlot = hGridArray[myRow + 1][myCol];
        if(gridSlot >= 1) {
            normalSideValid = true;
            sideCount++;
        }
    }

    if(!noDown) {
        let gridSlot = hGridArray[myRow][myCol - 1];
        if(gridSlot >= 1) {
            normalSideValid = true;
            sideCount++;
        }
    }

    if(!noUp) {
        let gridSlot = hGridArray[myRow][myCol + 1];
        if(gridSlot >= 1) {
            normalSideValid = true;
            sideCount++;
        }
    }

    if(!normalSideValid) {
        alert("Invalid selection!\n(Diagonal or Separate building detected)");
        return 0;
    }

    if(sideCount > 1) {
        if(!noLeft && !noUp) {
            let gridSlot = hGridArray[myRow - 1][myCol + 1];
            if(gridSlot >= 1) {
                sideCount++;
                return sideCount;
            }
        }

        if(!noLeft && !noDown) {
            let gridSlot = hGridArray[myRow - 1][myCol - 1];
            if(gridSlot >= 1) {
                sideCount++;
                return sideCount;
            }
        }

        if(!noRight && !noUp) {
            let gridSlot = hGridArray[myRow + 1][myCol + 1];
            if(gridSlot >= 1) {
                sideCount++;
                return sideCount;
            }
        }

        if(!noRight && !noDown) {
            let gridSlot = hGridArray[myRow + 1][myCol - 1];
            if(gridSlot >= 1) {
                sideCount++;
                return sideCount;
            }
        }
    }
    return sideCount;
}

//changeCellColor changes a cell to either red if selected the first
//time, or white otherwise.
function changeCellColor(myEvent) {
    let clickedOn = myEvent.target;

    diagnosticMessages(clickedOn, false);

    colorCheck = clickedOn.style.backgroundColor;
    if(colorCheck != "rgb(255, 0, 0)") {
        let sideCheck = getConnectedCount(clickedOn);
        if(sideCheck == 0) return;

        clickedOn.style.backgroundColor = "rgb(255, 0, 0)";
        hGridArray[clickedOn.myRow][clickedOn.myCol] = 1;
        numSquaresSelected++;
        if(sideCheck == -1) changeRequirements(clickedOn, true, false);
        else changeRequirements(clickedOn, false, true);
        return;
    }

    if(numSquaresSelected == 0) {
        buildingPlaced = false;
        mySuppliesNeeded = [0, 0, 0, 0];
    }

    clickedOn.style.backgroundColor = "rgba(0, 0, 0, 0)";
    hGridArray[clickedOn.myRow][clickedOn.myCol] = 0;
    numSquaresSelected--;
    if(numSquaresSelected == 0) buildingPlaced = false;
    changeRequirements(clickedOn, false, false);
}

//twoDimArray returns a newly initialized two-dimensional array.
function twoDimArray(rows) {
    let myArray = [];

    for(let i = 0; i < rows; i++) {
        myArray[i] = [];
    }
    return myArray;
}

//housingGrid initializes a new grid customized with mouse listeners
//for selection of specific cells.
function housingGrid(rows, columns) {
    let hGrid = document.createElement('table');
    hGrid.className = 'grid';

    for(let currentRow = 0; currentRow < rows; currentRow++) {
        let tableRow = hGrid.
            appendChild(document.createElement('tr'));

        for(let currentCol = 0; currentCol < columns; currentCol++) {
            let tableCell = tableRow.
                appendChild(document.createElement('td'));

            tableCell.addEventListener('click', changeCellColor, false);
            tableCell.myRow = currentRow;
            tableCell.myCol = currentCol;
        }
    }
    return hGrid;
}

//Variables
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
var myGrid = housingGrid(20, 20);
var hGridArray = twoDimArray(20);
var buildingPlaced = false;
var numSquaresSelected = 0;
var carpentrySkill = 0;
var masonrySkill = 30;
//1st: Planks, 2nd: Large Nails, 3rd: Small Nails, 4th: Wood Shingles
//5th: Stone Bricks, 6th: Mortar
var mySuppliesNeeded = [0, 0, 0, 0, 0, 0];

//HTML Properties
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
document.body.appendChild(myGrid);
