/**
 * Cornell AI 360 coursework, made explorable.
 *
 * IP / ACADEMIC INTEGRITY (brief §5B.3, §8.5):
 *  - Descriptions are in Hadi's own words (sourced from memory/10 and his own
 *    Cornell/Projects write-ups). No eCornell prompt text is copied.
 *  - `artifact` links point at his own write-ups / papers in /public/projects.
 *  - `notebookLinks` point at the 12 EXECUTED NLP notebooks (Hadi approved,
 *    6/10/26): rendered to HTML with eCornell course-prompt markdown and
 *    unit-test scaffolding stripped, code + outputs only.
 *  - Course TEMPLATES ("YOUR CODE HERE" present, executed === false) are NEVER
 *    published; their cards say "available on request".
 */

export type AI360Track = "NLP" | "Machine Learning" | "Data Science (R)";

export interface AI360Project {
  id: string;
  title: string;
  track: AI360Track;
  /** Hadi's own words. */
  blurb: string;
  /** skillmap skill ids this evidences */
  skills: string[];
  /** only set when an already-public artifact exists (write-up / paper) */
  artifact?: { label: string; href: string };
  /** published executed-notebook HTML (eCornell scaffolding stripped) */
  notebookLinks?: { label: string; href: string }[];
  /** memory/10 classification: executed-with-outputs (true) vs course template (false) */
  executed?: boolean;
}

const NB = "/projects/ai360";

export const AI360_PROJECTS: AI360Project[] = [
  // ---------------- NLP With Python (CIS571-576) ----------------
  {
    id: "rake",
    title: "Keyword Extraction & Speech Similarity (RAKE)",
    track: "NLP",
    blurb:
      "I built a RAKE pipeline that pulls weighted keyphrases from 59 U.S. inaugural addresses and scores how thematically close any two speeches are. It processes 119,141 unique n-grams and ranks the closest rhetorical pairs, with no training data.",
    skills: ["nlp", "py"],
    artifact: { label: "Read the write-up (PDF)", href: "/projects/RAKE_Similarity_Portfolio.pdf" },
  },
  {
    id: "lda",
    title: "Topic Modeling with LDA",
    track: "NLP",
    blurb:
      "I built a TF-IDF document-term matrix over the same 59-speech corpus (97.8% sparse) and trained a Latent Dirichlet Allocation model that surfaced 10 latent topics, from constitutional governance to global affairs, across 230 years of rhetoric.",
    skills: ["nlp", "py", "ml"],
    artifact: { label: "Read the write-up (PDF)", href: "/projects/LDA_Topic_Modeling_Portfolio.pdf" },
    notebookLinks: [{ label: "Topic modeling notebook", href: `${NB}/topic_modeling.html` }],
  },
  {
    id: "pagerank",
    title: "Extractive Summarization with PageRank",
    track: "NLP",
    blurb:
      "I implemented PageRank over a sentence-similarity graph to summarize a speech: build a TF-IDF matrix in 534-dimensional term space, compute a Gramian of cosine similarities, then rank the most central sentences. Sentences similar to many others make the best summary.",
    skills: ["nlp", "py"],
    artifact: { label: "Read the write-up (PDF)", href: "/projects/PageRank_Summarization_Portfolio.pdf" },
    notebookLinks: [{ label: "Summarization notebook", href: `${NB}/extractive_summarization.html` }],
  },
  {
    id: "vectors",
    title: "Text Vectorization: TF-IDF, Word2Vec, FastText",
    track: "NLP",
    blurb:
      "I worked through the full vectorization stack: count and TF-IDF document-term matrices, sparse vs dense representations (scipy CSR), cosine-similarity document search, then Word2Vec embeddings (vector arithmetic, PCA views of the space) and FastText subword vectors for out-of-vocabulary words.",
    skills: ["nlp", "py", "ml"],
    notebookLinks: [
      { label: "Vector similarity", href: `${NB}/vector_similarity.html` },
      { label: "Dense document vectors", href: `${NB}/dense_document_vector.html` },
      { label: "Text similarity metrics", href: `${NB}/text_similarity_metrics.html` },
    ],
    executed: true,
  },
  {
    id: "sentiment",
    title: "Sentiment & Semantic Analysis",
    track: "NLP",
    blurb:
      "I compared sentiment techniques on real text and used WordNet for semantic relationships (synonyms, hypernyms, similarity). The point was to see where lexicon-based scoring breaks down and where it holds up.",
    skills: ["nlp", "py"],
    notebookLinks: [
      { label: "Sentiment analysis", href: `${NB}/sentiment_analysis.html` },
      { label: "WordNet semantic analysis", href: `${NB}/semantic_analysis_wordnet.html` },
    ],
    executed: true,
  },
  {
    id: "ner",
    title: "Named Entity Recognition Tagger",
    track: "NLP",
    blurb:
      "I trained a model to tag named entities inside raw text, in BIO format with a CRF. This is the coursework that fed directly into ROE-ResumeNER, the XLM-RoBERTa NER model I trained for multilingual resumes.",
    skills: ["nlp", "py"],
    notebookLinks: [{ label: "NER tagger notebook", href: `${NB}/ner_tagger.html` }],
    executed: true,
  },
  {
    id: "textclass",
    title: "Supervised Text Classification",
    track: "NLP",
    blurb:
      "I built classifiers that assign categories to documents, prepared the supervised dataset, and evaluated the model end to end with the standard classification metrics.",
    skills: ["nlp", "ml", "py"],
    notebookLinks: [
      { label: "Text categorization", href: `${NB}/text_classification.html` },
      { label: "Supervised data prep", href: `${NB}/supervised_dataprep.html` },
      { label: "Model evaluation", href: `${NB}/classification_model_evaluation.html` },
    ],
    executed: true,
  },
  {
    id: "textcluster",
    title: "Document Clustering on Embeddings",
    track: "NLP",
    blurb:
      "I clustered documents by their sentence embeddings using hierarchical clustering, then read the groupings back to see what the model decided was 'similar'.",
    skills: ["nlp", "ml", "py"],
    notebookLinks: [{ label: "Document clustering notebook", href: `${NB}/document_clustering.html` }],
    executed: true,
  },
  // ---------------- Technical ML (CIS531-537, Python from scratch) ----------------
  {
    id: "knn",
    title: "k-Nearest Neighbors Facial Recognition",
    track: "Machine Learning",
    blurb:
      "I built a k-NN facial recognition system with fully vectorized Euclidean distance, computing the distance matrix as a Gram matrix with no Python loops. The exercise was as much about NumPy vectorization as it was about k-NN.",
    skills: ["ml", "py"],
    executed: false,
  },
  {
    id: "nbayes",
    title: "Naive Bayes from Scratch",
    track: "Machine Learning",
    blurb:
      "I implemented Naive Bayes from first principles for a baby-name classifier, including hashed feature engineering and the MLE/MAP probability estimation behind it.",
    skills: ["ml", "py"],
    executed: false,
  },
  {
    id: "linear",
    title: "Perceptron & Logistic Regression from Scratch",
    track: "Machine Learning",
    blurb:
      "I wrote the perceptron update rule, then linear and logistic regression with the sigmoid, logistic loss, and gradient descent, all by hand. This is the math under every classifier I have trained since.",
    skills: ["ml", "py"],
    executed: false,
  },
  {
    id: "trees",
    title: "Decision Trees (CART) from Scratch",
    track: "Machine Learning",
    blurb:
      "I implemented CART from scratch: squared-impurity scoring, best-split search, and regression trees. Building the splitting logic by hand is the fastest way to understand why trees overfit.",
    skills: ["ml", "py"],
    executed: false,
  },
  {
    id: "ensembles",
    title: "Bagging, Random Forests & Gradient Boosting",
    track: "Machine Learning",
    blurb:
      "I built bagging, random forests, and gradient-boosted trees from scratch and reasoned through which reduces variance and which reduces bias. That intuition is exactly what I tuned later in ROE-Match (LightGBM).",
    skills: ["ml", "py"],
    executed: false,
  },
  {
    id: "svm",
    title: "Kernel Machines: Linear & Kernelized SVM",
    track: "Machine Learning",
    blurb:
      "I worked through support vector machines and the kernel trick, building non-linear decision boundaries out of linear classifiers and seeing where each kernel helps.",
    skills: ["ml", "py"],
    executed: false,
  },
  {
    id: "modelsel",
    title: "Cross-Validation & Bias-Variance",
    track: "Machine Learning",
    blurb:
      "I implemented k-fold cross-validation and grid search from scratch and computed the bias-variance decomposition empirically (estimating the average prediction, noise, and variance terms). This is the discipline behind the leakage gates in my trained models.",
    skills: ["ml", "py"],
    executed: false,
  },
  {
    id: "cnn",
    title: "Convolutional Neural Networks on MNIST",
    track: "Machine Learning",
    blurb:
      "I built a full CNN workflow in Keras: class-balance checks with SMOTE, normalization and resizing, a Conv2D plus dense network trained for 200 epochs to roughly 0.97 to 0.99 per-class accuracy, then extracted and visualized the learned convolution filters and ran Sobel and sharpening preprocessing experiments.",
    skills: ["ml", "pt", "py"],
    executed: false,
  },
  // ---------------- Data Science / Analytics (CEEM581-586, in R) ----------------
  {
    id: "dchousing",
    title: "DC Housing Price Prediction (H2O + LIME)",
    track: "Data Science (R)",
    blurb:
      "My applied AI 360 paper, in IEEE format. I cleaned 10,617 Washington D.C. property transactions down to 108 features, trained a 3-hidden-layer neural network in H2O (in R), reached validation R-squared 0.811 (MAE around $73,644), and used LIME to explain individual predictions to non-technical readers.",
    skills: ["r", "ml"],
    artifact: { label: "Read the paper (PDF)", href: "/projects/neural_network_dc_housing.pdf" },
  },
  {
    id: "ttic",
    title: "Urban Traffic Congestion Clustering",
    track: "Data Science (R)",
    blurb:
      "I clustered 101 U.S. urban areas on 14 congestion variables with agglomerative hierarchical clustering (Ward's method) and found 4 well-separated groups along a congestion-severity spectrum, with clear infrastructure-priority implications.",
    skills: ["r"],
    artifact: { label: "Read the write-up (PDF)", href: "/projects/TTI_Cluster_Analysis_Portfolio.pdf" },
  },
  {
    id: "ttih",
    title: "COVID-19 Vaccine Hotspot Analysis",
    track: "Data Science (R)",
    blurb:
      "I ran Getis-Ord Gi* hotspot analysis across continental U.S. counties and found significant spatial clustering: the Deep South as a dominant coldspot (z down to -6.67) and the Northeast as a strong hotspot (+5.18), with direct public-health policy implications.",
    skills: ["r"],
    artifact: { label: "Read the write-up (PDF)", href: "/projects/TTI_Hotspot_Analysis_Portfolio.pdf" },
  },
  {
    id: "analytics",
    title: "Association Rules, PCA & Factor Analysis",
    track: "Data Science (R)",
    blurb:
      "Across the analytics track I mined market-basket association rules, reduced dimensionality with PCA, and used factor analysis to understand smart-meter adoption, all in R on real datasets.",
    skills: ["r", "ml"],
    artifact: { label: "Read the data-analytics portfolio (PDF)", href: "/projects/cornell_data_analytics.pdf" },
  },
];

export const AI360_TRACKS: AI360Track[] = ["NLP", "Machine Learning", "Data Science (R)"];

export const ai360ForSkill = (skillId: string) =>
  AI360_PROJECTS.filter((p) => p.skills.includes(skillId));
