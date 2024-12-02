export type dataProps = {
    Date: string;
    Username: string;
    Rating: number;
    "Review Text": string;
    cleaning: string;
    case_folding: string;
    normalisasi: string;
    tokenize: string;
    "stopword removal": string;
    stemming_data: string;
    sentimen: string;
};

export type ClassifierResult = {
    ulasan: string;
    prediksi: string;
    hasil: string;
}

// Klasifikasi NaiveBayes
const classifyNaiveBayes = (data: dataProps[], text: string) => {
    const totalReviews = data.length;
    const positiveReviews = data.filter((d) => d.sentimen === "positif").length;
    const negativeReviews = data.filter((d) => d.sentimen === "negatif").length;

    const probPositive = positiveReviews / totalReviews;
    const probNegative = negativeReviews / totalReviews;

    // Simulate token presence
    const words = text.toLowerCase().split(" ");
    const posScore = words.reduce((acc, word) => acc + (word.includes("bagus") ? 1 : 0), 0);
    const negScore = words.reduce((acc, word) => acc + (word.includes("sampah") ? 1 : 0), 0);

    return posScore * probPositive > negScore * probNegative ? "positif" : "negatif";
}

// Klasifikasi SVM
const classifySVM = (text: string) => {
    const negWords = ["buruk", "sampah", "tidak"];
    const posWords = ["mantap", "bagus", "baik"];

    const tokens = text.toLowerCase().split(" ");
    const posCount = tokens.filter((word) => posWords.includes(word)).length;
    const negCount = tokens.filter((word) => negWords.includes(word)).length;

    return posCount > negCount ? "positif" : "negatif";
}

// Confusion Matrix 
const generateConfusionMatrix = (data: dataProps[], classifier: (text: string) => string) => {
    let tp = 0, tn = 0, fp = 0, fn = 0;

    data.forEach((d) => {
        const prediction = classifier(d["Review Text"]);
        if (prediction === "positif" && d.sentimen === "positif") tp++;
        else if (prediction === "negatif" && d.sentimen === "negatif") tn++;
        else if (prediction === "positif" && d.sentimen === "negatif") tn++;
        else if (prediction === "negatif" && d.sentimen === "positif") tn++;
    });

    return { tp, tn, fp, fn};
}


export const ACCOUNT = {
    USERNAME: "admin@gmail.com",
    PASSWORD: "password",
}