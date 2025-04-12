document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const textOverlay = document.getElementById("textOverlay");
    const backgrounds = document.getElementById("backgrounds");
    const textInput = document.getElementById("textInput");
    const saveButton = document.getElementById("saveButton");

    // Изменение фона в редакторе
    backgrounds.addEventListener("change", () => {
        const selectedBackground = backgrounds.value;
        if (selectedBackground) {
            canvas.style.backgroundImage = `url(${selectedBackground})`;
            canvas.style.backgroundSize = "cover";
            canvas.style.backgroundPosition = "center";
        } else {
            canvas.style.backgroundImage = "none";
        }
    });

    // Отображение текста в редакторе
    textInput.addEventListener("input", () => {
        const text = textInput.value;
        textOverlay.textContent = text;

        // Рассчитываем размер шрифта
        const maxFontSize = 150; // Максимальный размер шрифта (для 4 букв)
        const minFontSize = 100;  // Минимальный размер шрифта (для 6 букв)
        const textLength = text.length;

        // Линейная интерполяция размера шрифта
        const fontSize = textLength <= 4
            ? maxFontSize
            : textLength >= 6
            ? minFontSize
            : maxFontSize - ((textLength - 4) * (maxFontSize - minFontSize)) / 2;

        textOverlay.style.fontSize = `${fontSize}px`;
    });

    // Сохранение обложки в формате JPG
    saveButton.addEventListener("click", () => {
        const text = textInput.value.trim(); // Получаем текст из редактора
        const backgroundName = backgrounds.value.split('/').pop().split('.')[0]; // Извлекаем имя файла фона без расширения

        const fileName = `${text || "default"}_${backgroundName || "background"}.jpg`; // Формируем имя файла

        html2canvas(canvas, {
            scale: 2 // Увеличиваем масштаб рендеринга
        }).then((canvasElement) => {
            const link = document.createElement("a");
            link.download = fileName; // Устанавливаем имя файла
            link.href = canvasElement.toDataURL("image/jpeg", 0.95); // Сохраняем в JPG с качеством 95%
            link.click();
        });
    });
});