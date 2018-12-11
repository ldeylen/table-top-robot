/*
    Name has been added her so I don't have to type the string all the time
    Angle is used to determine what angle to make the robot face when place button is clicked.
 */

export const directionNorth = {
    name: 'NORTH',
    angle: 270,
};
export const directionEast = {
    name: 'EAST',
    angle: 0,
};

export const directionSouth = {
    name: 'SOUTH',
    angle: 90,
};
export const directionWest = {
    name: 'WEST',
    angle: 180,
};

export const getLeftDirectionName = (currentDirection) => {
    switch (currentDirection) {
        case directionNorth.name:
            return directionWest.name;
        case directionWest.name:
            return directionSouth.name;
        case directionSouth.name:
            return directionEast.name;
        case directionEast.name:
            return directionNorth.name;
    }
    return null;
};

export const getRightDirectionName = (currentDirection) => {
    switch (currentDirection) {
        case directionNorth.name:
            return directionEast.name;
        case directionEast.name:
            return directionSouth.name;
        case directionSouth.name:
            return directionWest.name;
        case directionWest.name:
            return directionNorth.name;
    }
    return null;
};

export const getAngleByDirectionName = (currentDirection) => {
    return getDirectionObjectByName(currentDirection).angle;
};

export const getDirectionObjectByName = (currentDirection) => {
    switch (currentDirection) {
        case directionNorth.name:
            return directionNorth;
        case directionEast.name:
            return directionEast;
        case directionSouth.name:
            return directionSouth;
        case directionWest.name:
            return directionWest;
    }
    return null;
};

export const getMovePosition = (currentX, currentY, currentDirection) => {
    let newXPosition = currentX;
    let newYPosition = currentY;
    switch (currentDirection) {
        case directionNorth.name:
            newYPosition += 1;
            break;
        case directionEast.name:
            newXPosition += 1;
            break;
        case directionSouth.name:
            newYPosition -= 1;
            break;
        case directionWest.name:
            newXPosition -= 1;
            break;
    }
    if (newXPosition >= 0 && newXPosition < 5 && newYPosition >= 0 && newYPosition < 5) return {
        x: newXPosition,
        y: newYPosition,
    }
    return null;
};

export const isValidDirection = (direction) => {
    if (direction === directionNorth.name ||
        direction === directionEast.name ||
        direction === directionSouth.name ||
        direction === directionWest.name) return true;
    return false;
}
