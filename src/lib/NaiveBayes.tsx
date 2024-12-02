export const getDataFromLocalStorage = () => {
  const rawData = localStorage.getItem("dataSentiment");
  return rawData ? JSON.parse(rawData) : [];
};

export const trainNaiveBayes = (data: any[]) => {
  const positiveData = data.filter((item) => item.sentimen === "positif");
  const negativeData = data.filter((item) => item.negatif === "negative");

  const tokenizeAndCount = (textArray: string[]) => {
    return textArray.reduce((acc, word) => {
        return acc;
    }, {} as Record<string, number>);
  };

  const countWords = (dataset: any[]) => {
    return dataset.flatMap((item) => item["stemming_data"].split(" ")); //Ambil kata steming
  }

  const positiveWords = countWords(positiveData);
  const negativeWords = countWords(negativeData);

  const positiveWordCount = tokenizeAndCount(positiveWords);
  const negativeWordCount = tokenizeAndCount(negativeWords);

  const totalPositive = positiveWordCount.length;
  const totalNegative = negativeWordCount.length;

  const vocabularySize = new Set([...positiveWords, ...negativeWords]).size;

  return {
    classify: (text: string) => {
        const words = text.split(" ");
        let positiveScore = 1;
        let negativeScore = 1;

        words.forEach((word) => {
            positiveScore *= (positiveWordCount[word] || 0 + 1) / (totalPositive + vocabularySize);
            negativeScore *= (negativeWordCount[word] || 0 + 1) / (totalNegative + vocabularySize);
        })

        return positiveScore > negativeScore ? "positif" : "negatif";
    },
  };
};


// Cara menggunakan:
const data = getDataFromLocalStorage();
const naiveBayesModel = trainNaiveBayes(data);
const sentiment = naiveBayesModel.classify("pengalaman buruk menggunakan aplikasi ini");
console.log(sentiment); // Output: 'negatif' atau 'positif'