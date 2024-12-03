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
};

export type ConfusionMatrix = {
  TP: number;
  TN: number;
  FP: number;
  FN: number;
};

// Klasifikasi NaiveBayes
export const classifyNaiveBayes = (data: dataProps[], text: string) => {
  const totalReviews = data.length;
  const positiveReviews = data.filter((d) => d.sentimen === "positif").length;
  const negativeReviews = data.filter((d) => d.sentimen === "negatif").length;

  const probPositive = positiveReviews / totalReviews;
  const probNegative = negativeReviews / totalReviews;

  // Simulate token presence
  const words = text.toLowerCase().split(" ");
  const posScore = words.reduce(
    (acc, word) => acc + (word.includes("bagus") ? 1 : 0),
    0
  );
  const negScore = words.reduce(
    (acc, word) => acc + (word.includes("sampah") ? 1 : 0),
    0
  );

  return posScore * probPositive > negScore * probNegative
    ? "positif"
    : "negatif";
};

// Klasifikasi SVM
export const classifySVM = (text: string) => {
  const negWords = ["buruk", "sampah", "tidak"];
  const posWords = ["mantap", "bagus", "baik"];

  const tokens = text.toLowerCase().split(" ");
  const posCount = tokens.filter((word) => posWords.includes(word)).length;
  const negCount = tokens.filter((word) => negWords.includes(word)).length;

  return posCount > negCount ? "positif" : "negatif";
};

export const generateConfusionMatrix = (
  predictions: string[],
  groundTruths: string[]
): ConfusionMatrix => {
  let TP = 0,
    TN = 0,
    FP = 0,
    FN = 0;

  predictions.forEach((prediction, index) => {
    const actual = groundTruths[index];
    if (prediction === "positive" && actual === "positive") TP++;
    else if (prediction === "negative" && actual === "negative") TN++;
    else if (prediction === "positive" && actual === "negative") FP++;
    else if (prediction === "negative" && actual === "positive") FN++;
  });

  return { TP, TN, FP, FN };
};

export const calculatedAccuracy = (confusionMatrix: ConfusionMatrix) : number => {
    const {TP, TN, FP, FN }  = confusionMatrix;

    const total = TP + TN + FP + FN ;
    if (total === 0 ){
        throw new Error("Total instances in the confusion matrix cannot be zero.");
    }

    const accuracy = (TP + TN) / total;
    return accuracy;
}

export const ACCOUNT = {
  USERNAME: "admin@gmail.com",
  PASSWORD: "password",
};
