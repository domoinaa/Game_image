export class Helper {
    static isSamePosition(position1, position2) {
        return (
            position1.indexCol === position2.indexCol &&
            position1.indexRow === position2.indexRow
            // position2.rotation % 90 === 0
        );
    }

    static shuffleImages(images) {
        const imagesShuffled = [...images];

        for (let i = 0; i < imagesShuffled.length; i++) {
            const rows = imagesShuffled.length;
            const cols = imagesShuffled[i].length;
            for (let j = 0; j < imagesShuffled[i].length; j++) {
                const randomCol = Math.floor(Math.random() * cols);
                const randomRow = Math.floor(Math.random() * rows);

                imagesShuffled[randomRow][randomCol].setCurrentPosition({
                    indexCol: j,
                    indexRow: i,
                });
                imagesShuffled[i][j].setCurrentPosition({
                    indexCol: randomCol,
                    indexRow: randomRow,
                });
                const temp = imagesShuffled[randomRow][randomCol];
                imagesShuffled[randomRow][randomCol] = imagesShuffled[i][j];
                imagesShuffled[i][j] = temp;
            }
        }
        return imagesShuffled;
    }

    static rotate90Degrees(matrix) {
        const n = matrix.length;
        const rotatedMatrix = [];

        for (let i = 0; i < n; i++) {
            rotatedMatrix.push([]);
            for (let j = 0; j < n; j++) {
                rotatedMatrix[i].push(matrix[n - j - 1][i]);
                rotatedMatrix[i][j].setCurrentPosition({
                    indexCol: j,
                    indexRow: i,
                });
            }
        }

        return rotatedMatrix;
    }

    static rotateMinus90Degrees(matrix) {
        const n = matrix.length;
        const rotatedMatrix = [];

        for (let i = 0; i < n; i++) {
            rotatedMatrix.push([]);
            for (let j = 0; j < n; j++) {
                rotatedMatrix[i].push(matrix[j][n - i - 1]);
                rotatedMatrix[i][j].setCurrentPosition({
                    indexCol: j,
                    indexRow: i,
                });
            }
        }

        return rotatedMatrix;
    }

    static rotate180Degrees(images) {
        const n = images.length;
        const rotatedMatrix = [];

        for (let i = 0; i < n; i++) {
            rotatedMatrix.push([]);
            for (let j = 0; j < n; j++) {
                rotatedMatrix[i].push(images[n - i - 1][n - j - 1]);
                rotatedMatrix[i][j].setCurrentPosition({
                    indexCol: j,
                    indexRow: i,
                });
            }
        }

        return rotatedMatrix;
    }

    static rotate45Degrees(matrix) {
        const n = matrix.length;
        const rotatedMatrix = [];

        // Calcul des coordonnées du centre de la matrice
        const centerX = (n - 1) / 2;
        const centerY = (n - 1) / 2;

        // Rotation de chaque élément
        for (let i = 0; i < n; i++) {
            rotatedMatrix.push([]);
            for (let j = 0; j < n; j++) {
                // Calcul des nouvelles coordonnées
                const newX = Math.round(
                    (i - centerX) * Math.cos(Math.PI / 4) -
                        (j - centerY) * Math.sin(Math.PI / 4) +
                        centerX
                );
                const newY = Math.round(
                    (i - centerX) * Math.sin(Math.PI / 4) +
                        (j - centerY) * Math.cos(Math.PI / 4) +
                        centerY
                );

                // Vérification si les nouvelles coordonnées sont dans les limites de la matrice
                if (newX >= 0 && newX < n && newY >= 0 && newY < n) {
                    rotatedMatrix[i][j] = matrix[newX][newY];
                    rotatedMatrix[i][j].setCurrentPosition({
                        indexCol: j,
                        indexRow: i,
                    });
                } else {
                    rotatedMatrix[i][j] = 0; // Valeur par défaut pour les cellules en dehors de la matrice d'origine
                }
            }
        }

        return rotatedMatrix;
    }

    static rotate45Degrees(matrix) {
        const n = matrix.length;
        const rotatedMatrix = [];

        // Calcul des coordonnées du centre de la matrice
        const centerX = (n - 1) / 2;
        const centerY = (n - 1) / 2;

        // Rotation de chaque élément
        for (let i = 0; i < n; i++) {
            rotatedMatrix.push([]);
            for (let j = 0; j < n; j++) {
                // Calcul des nouvelles coordonnées
                const newX = Math.round(
                    (i - centerX) * Math.cos(Math.PI / 4) -
                        (j - centerY) * Math.sin(Math.PI / 4) +
                        centerX
                );
                const newY = Math.round(
                    (i - centerX) * Math.sin(Math.PI / 4) +
                        (j - centerY) * Math.cos(Math.PI / 4) +
                        centerY
                );

                // Vérification si les nouvelles coordonnées sont dans les limites de la matrice
                if (newX >= 0 && newX < n && newY >= 0 && newY < n) {
                    rotatedMatrix[i][j] = matrix[newX][newY];
                    rotatedMatrix[i][j].setCurrentPosition({
                        indexCol: j,
                        indexRow: i,
                    });
                } else {
                    rotatedMatrix[i][j] = 0; // Valeur par défaut pour les cellules en dehors de la matrice d'origine
                }
            }
        }

        return rotatedMatrix;
    }
    
    static rotateMinus180Degrees(matrix) {
        const n = matrix.length;
        const rotatedMatrix = [];

        for (let i = 0; i < n; i++) {
            rotatedMatrix.push([]);
            for (let j = 0; j < n; j++) {
                rotatedMatrix[i].push(matrix[n - i - 1][n - j - 1]);
                rotatedMatrix[i][j].setCurrentPosition({
                    indexCol: j,
                    indexRow: i,
                });
            }
        }

        return rotatedMatrix;
    }

    static rotateMinus45Degrees(matrix) {
        const n = matrix.length;
        const rotatedMatrix = [];

        // Nouvelle taille de la matrice après la rotation de -45 degrés
        const newSize = Math.ceil(n * Math.sqrt(2));

        // Remplissage de la nouvelle matrice avec des zéros
        for (let i = 0; i < newSize; i++) {
            rotatedMatrix.push(new Array(newSize).fill(0));
        }

        // Coordonnées du centre de la matrice originale
        const centerX = Math.floor(n / 2);
        const centerY = Math.floor(n / 2);

        // Transformation de chaque élément de la matrice originale
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = j - centerX;
                const y = i - centerY;
                const newX = Math.round(
                    x * Math.cos(-Math.PI / 4) - y * Math.sin(-Math.PI / 4)
                );
                const newY = Math.round(
                    x * Math.sin(-Math.PI / 4) + y * Math.cos(-Math.PI / 4)
                );
                rotatedMatrix[newY + Math.floor(newSize / 2)][
                    newX + Math.floor(newSize / 2)
                ] = matrix[i][j];
                rotatedMatrix[i][j].setCurrentPosition({
                    indexCol: newX + Math.floor(newSize / 2),
                    indexRow: newY + Math.floor(newSize / 2),
                });
            }
        }
    }
}
