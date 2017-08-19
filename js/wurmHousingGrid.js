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

    let myNumberSquaresMessage = "The grid had " + numSquaresSelected +
        " Squares selected.";
    console.log(myNumberSquaresMessage);

    let gridSlot = hGridArray[clickedOn.myRow][clickedOn.myCol];
    if(gridSlot == null) {
        console.log("This slot was undefined!");
        return;
    }
    let myGridMessage = "This had " + gridSlot + " in it.";
    console.log(myGridMessage);
}

//updateHighestElevated updates the highestElevated
//variable when a new highest is found.
//Is primarily used for subtraction of a level.
function updateHighestElevated() {
    let highestFound = 0;

    for(let i = 0; i < lengthOfGrid; i++) {
        for(let j = 0; j < widthOfGrid; j++) {
            if(hGridArray[i][j] != 0 && hGridArray[i][j] > highestFound) {
                highestFound = hGridArray[i][j];
            }
        }
    }

    //I do this to accommodate for my subtraction style
    highestFound--;
    if(highestFound > 1) highestElevated = getElevatedCarpentry(highestFound);
    else highestElevated = 0;
}

//getElevatedCarpentry returns the carpentry
//level based on the fixed presets of Wurm
//(As of August 18th 2017)
function getElevatedCarpentry(myLevel) {
    switch(myLevel) {
        case 1:
            return 0;
        case 2:
            return 21;
        case 3:
            return 30;
        case 4:
            return 39;
        case 5:
            return 47;
        case 6:
            return 55;
        case 7:
            return 63;
        case 8:
            return 70;
        case 9:
            return 77;
        case 10:
            return 83;
        case 11:
            return 88;
        case 12:
            return 92;
        case 13:
            return 95;
        case 14:
            return 97;
        case 15:
            return 98;
        case 16:
            return 99;
        default:
            alert("getElevatedCarpentry: Invalid level specified.");
            return -1;
    }
}

//getElevatedColor returns the appropriate color
//code in rgb for the level specified.
function getElevatedColor(myLevel) {
    switch(myLevel) {
        case 0:
            return "rgba(0, 0, 0, 0)";
        case 1:
            return "rgb(30, 0, 255)";
        case 2:
            return "rgb(0, 66, 255)";
        case 3:
            return "rgb(0, 162, 255)";
        case 4:
            return "rgb(0, 252, 255)";
        case 5:
            return "rgb(0,255,162)";
        case 6:
            return "rgb(0, 255, 66)";
        case 7:
            return "rgb(30, 255, 0)";
        case 8:
            return "rgb(126, 255, 0)";
        case 9:
            return "rgb(222, 255, 0)";
        case 10:
            return "rgb(255, 192, 0)";
        case 11:
            return "rgb(255, 96, 0)";
        case 12:
            return "rgb(255, 0, 0)";
        case 13:
            return "rgb(255, 0, 96)";
        case 14:
            return "rgb(255, 0, 192)";
        case 15:
            return "rgb(222, 0, 255)";
        case 16:
            return "rgb(126, 0, 255)";
        default:
            alert("getElevatedColor: Invalid level specified.");
            return -1;
    }
}

//changeRequirements updates the text on the page describing the
//required materials.
function changeRequirements(clickedOn, isAdding) {
    let gridSlot = hGridArray[clickedOn.myRow][clickedOn.myCol];
    if(numSquaresSelected == 1 && gridSlot == 1 && numElevated == 0) {
        carpentrySkill = 5;

        mySuppliesNeeded[0] = 80;
        mySuppliesNeeded[1] = 4;
        mySuppliesNeeded[2] = 8;
        mySuppliesNeeded[3] = 10;
        mySuppliesNeeded[4] = 90;
        mySuppliesNeeded[5] = 95;
        mySuppliesNeeded[6] = 10;

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
        document.getElementById("slateshingles").innerHTML =
            "Slate Shingles: " + mySuppliesNeeded[6];
        return 0;
    }

    if(!buildingPlaced) {
        carpentrySkill = 0;

        mySuppliesNeeded[0] = 0;
        mySuppliesNeeded[1] = 0;
        mySuppliesNeeded[2] = 0;
        mySuppliesNeeded[3] = 0;
        mySuppliesNeeded[4] = 0;
        mySuppliesNeeded[5] = 0;
        mySuppliesNeeded[6] = 0;

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
        document.getElementById("slateshingles").innerHTML =
            "Slate Shingles: " + mySuppliesNeeded[6];
        return 0;
    }

    let elevatedPreferred = false;
    if(isAdding) {
        let sideCount = getConnectedCount(clickedOn, false);

        if(sideCount == -1) return -1;

        if(gridSlot > 1) {
            let elevatedNumber = getElevatedCarpentry(gridSlot);

            if(elevatedNumber > highestElevated) highestElevated = elevatedNumber;
        } else {
            carpentrySkill -= sideCount;
            //I added one to the side count to incorporate a new floor.
            carpentrySkill += (4 - sideCount) + 1;

            if(carpentrySkill > 100) {
                carpentrySkill += sideCount;
                carpentrySkill -= (4 - sideCount) + 1;

                alert("Max carpentry skill exceeded!");
                return -1;
            }
        }
        if(highestElevated > carpentrySkill) elevatedPreferred = true;

        mySuppliesNeeded[0] -= 20 * sideCount;
        mySuppliesNeeded[0] += 20 * (4 - sideCount);

        mySuppliesNeeded[1] -= sideCount;
        mySuppliesNeeded[1] += 4 - sideCount;

        mySuppliesNeeded[4] -= 20 * sideCount;
        mySuppliesNeeded[4] += 20 * (4 - sideCount) + 10;

        mySuppliesNeeded[5] -= 20 * sideCount;
        mySuppliesNeeded[5] += 20 * (4 - sideCount) + 10;

        if(gridSlot == 1) {
            mySuppliesNeeded[2] += 4;
            mySuppliesNeeded[3] += 10;

            mySuppliesNeeded[5] += 5;
            mySuppliesNeeded[6] += 10;
        }

    } else {
        let sideCount = getConnectedCount(clickedOn, true);

        if(sideCount == -1) return -1;

        updateHighestElevated();
        if(gridSlot > 1) {
            let elevatedNumber = getElevatedCarpentry(gridSlot - 1);

            if(elevatedNumber > highestElevated) highestElevated = elevatedNumber;
        } else {
            carpentrySkill += sideCount;
            //I added one to the side count to incorporate a new floor.
            carpentrySkill -= (4 - sideCount) + 1;
        }
        if(highestElevated > carpentrySkill) elevatedPreferred = true;

        mySuppliesNeeded[0] += 20 * sideCount;
        mySuppliesNeeded[0] -= 20 * (4 - sideCount);

        mySuppliesNeeded[1] += sideCount;
        mySuppliesNeeded[1] -= 4 - sideCount;

        mySuppliesNeeded[4] += 20 * sideCount;
        mySuppliesNeeded[4] -= 20 * (4 - sideCount) + 10;

        mySuppliesNeeded[5] += 20 * sideCount;
        mySuppliesNeeded[5] -= 20 * (4 - sideCount) + 10;

        if(gridSlot == 1) {
            mySuppliesNeeded[2] -= 4;
            mySuppliesNeeded[3] -= 10;

            mySuppliesNeeded[5] -= 5;
            mySuppliesNeeded[6] -= 10;
        }
    }

    if(elevatedPreferred) {
        document.getElementById("carpentry").innerHTML =
            "Carpentry Required For Wooden House: " + highestElevated;
    } else {
        document.getElementById("carpentry").innerHTML =
            "Carpentry Required For Wooden House: " + carpentrySkill;
    }
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
    document.getElementById("slateshingles").innerHTML =
        "Slate Shingles: " + mySuppliesNeeded[6];
    return 0;
}

//getConnectedCount returns the number of connected blocks relative
//to the one selected by the user.
function getConnectedCount(clickedOn, isSubtracting) {
    if(!buildingPlaced) return 0;

    let myRow = clickedOn.myRow;
    let myCol = clickedOn.myCol;
    let noLeft = false;
    let noRight = false;
    let noUp = false;
    let noDown = false;
    let sideCount = 0;
    let gSlotReference = hGridArray[myRow][myCol];
    let isElevated = false;

    if(gSlotReference > 1) isElevated = true;

    if(myRow - 1 < 0) noLeft = true;
    if(myRow + 1 >= lengthOfGrid) noRight = true;
    if(myCol - 1 < 0) noDown = true;
    if(myCol + 1 >= widthOfGrid) noUp = true;

    let normalSideValid = false;
    if(!noLeft) {
        let gridSlot = hGridArray[myRow - 1][myCol];
        if(gridSlot != 0) {
            if(gridSlot >= gSlotReference && gSlotReference != 0) {
                normalSideValid = true;
                sideCount++;
            } else if(gridSlot < gSlotReference) isElevated = true;
        }
    }

    if(!noRight) {
        let gridSlot = hGridArray[myRow + 1][myCol];
        if(gridSlot != 0) {
            if(gridSlot >= gSlotReference && gSlotReference != 0) {
                normalSideValid = true;
                sideCount++;
            } else if(gridSlot < gSlotReference) isElevated = true;
        }
    }

    if(!noDown) {
        let gridSlot = hGridArray[myRow][myCol - 1];
        if(gridSlot != 0) {
            if(gridSlot >= gSlotReference && gSlotReference != 0) {
                normalSideValid = true;
                sideCount++;
            } else if(gridSlot < gSlotReference) isElevated = true;
        }
    }

    if(!noUp) {
        let gridSlot = hGridArray[myRow][myCol + 1];
        if(gridSlot != 0) {
            if(gridSlot >= gSlotReference && gSlotReference != 0) {
                normalSideValid = true;
                sideCount++;
            } else if(gridSlot < gSlotReference) isElevated = true;
        }
    }

    if(!normalSideValid && !isElevated) {
        return -1;
    }

    if(isSubtracting) {
        let isInvalid = false;

        if(!noLeft && hGridArray[myRow - 1][myCol] == 0) noLeft = true;
        if(!noRight && hGridArray[myRow + 1][myCol] == 0) noRight = true;
        if(!noUp && hGridArray[myRow][myCol + 1] == 0) noUp = true;
        if(!noDown && hGridArray[myRow][myCol - 1] == 0) noDown = true;

        if(gSlotReference - 1 == 0) {
            hGridArray[myRow][myCol]--;
            if(!noLeft) {
                clickedOn.myRow = myRow - 1;
                if(getConnectedCount(clickedOn) == -1) isInvalid = true;
            }

            if(!noRight) {
                clickedOn.myRow = myRow + 1;
                if(getConnectedCount(clickedOn) == -1) isInvalid = true;
            }

            if(!noDown) {
                clickedOn.myCol = myCol - 1;
                if(getConnectedCount(clickedOn) == -1) isInvalid = true;
            }

            if(!noUp) {
                clickedOn.myCol = myCol + 1;
                if(getConnectedCount(clickedOn) == -1) isInvalid = true;
            }

            clickedOn.myRow = myRow;
            clickedOn.myCol = myCol;
            hGridArray[myRow][myCol]++;

            if(isInvalid) {
                alert("Invalid selection!\n(Diagonal or Separate building detected)");
                return -1;
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

    //This area deals with adding a new square.
    if(hGridArray[clickedOn.myRow][clickedOn.myCol] == 0) {
        numSquaresSelected++;
        if(numSquaresSelected == 1) buildingPlaced = true;
        
        hGridArray[clickedOn.myRow][clickedOn.myCol] = 1;
        let myResultsFromChange = changeRequirements(clickedOn, true);

        if(myResultsFromChange == -1) {
            numSquaresSelected--;
            hGridArray[clickedOn.myRow][clickedOn.myCol] = 0;
            return;
        }

        clickedOn.style.backgroundColor = getElevatedColor(hGridArray[clickedOn.myRow][clickedOn.myCol]);
        clickedOn.innerHTML = 1;
        return;
    }

    if(myEvent.ctrlKey) {
        if(hGridArray[clickedOn.myRow][clickedOn.myCol] + 1 > 16) {
            alert("Max limit reached: Wurm houses cannot go beyond 16 levels!");
            return;
        }
        hGridArray[clickedOn.myRow][clickedOn.myCol] += 1;

        if(hGridArray[clickedOn.myRow][clickedOn.myCol] == 2) numElevated++;

        let myGridSlot = hGridArray[clickedOn.myRow][clickedOn.myCol];
        clickedOn.innerHTML = myGridSlot;
        changeRequirements(clickedOn, true);
        clickedOn.style.backgroundColor = getElevatedColor(hGridArray[clickedOn.myRow][clickedOn.myCol]);
        return;
    }

    // //This area deals with the removal of a square.
    if(hGridArray[clickedOn.myRow][clickedOn.myCol] == 1) {
        numSquaresSelected--;
        if(numSquaresSelected == 0) buildingPlaced = false;
    }

    if(hGridArray[clickedOn.myRow][clickedOn.myCol] - 1 == 1 && numElevated != 0) {
        numElevated--;
    }

    let myResultsFromChange = changeRequirements(clickedOn, false);
    if(myResultsFromChange == -1) {
        numSquaresSelected++;
        return;
    }

    hGridArray[clickedOn.myRow][clickedOn.myCol]--;

    if(hGridArray[clickedOn.myRow][clickedOn.myCol] != 0) {
        clickedOn.innerHTML = hGridArray[clickedOn.myRow][clickedOn.myCol];
    } else {
        clickedOn.innerHTML = "";
    }
    clickedOn.style.backgroundColor = getElevatedColor(hGridArray[clickedOn.myRow][clickedOn.myCol]);
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

            hGridArray[currentRow][currentCol] = 0;
        }
    }
    return hGrid;
}

//Variables
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
var lengthOfGrid = 20;
var widthOfGrid = 20;
var hGridArray = twoDimArray(lengthOfGrid);
var myGrid = housingGrid(lengthOfGrid, widthOfGrid);
var buildingPlaced = false;
var numSquaresSelected = 0;
var numElevated = 0;
var highestElevated = 0;
var carpentrySkill = 0;
var masonrySkill = 30;
//1st: Planks, 2nd: Large Nails, 3rd: Small Nails, 4th: Wood Shingles
//5th: Stone Bricks, 6th: Mortar, 7th: Slate Shingles
var mySuppliesNeeded = [0, 0, 0, 0, 0, 0, 0];

//HTML Properties
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
document.body.appendChild(myGrid);
