import { create } from 'zustand';
import { createSelector } from 'reselect';
import type { FeedbackItemProps } from '../types';

type FeedbackItemsStore = {
  isLoading: boolean;
  error: string;
  feedbackItems: FeedbackItemProps[];
  selectedCompany: string;
  getFilteredFeedbackItems: () => FeedbackItemProps[];
  addItemToList: (text: string) => Promise<void>;
  setSelectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

// Eingabe-Selektoren
const selectFeedbackItems = (state: FeedbackItemsStore) => state.feedbackItems;
const selectSelectedCompany = (state: FeedbackItemsStore) =>
  state.selectedCompany;

// Memoisierte Ausgabe-Selektoren
const selectFilteredFeedbackItems = createSelector(
  [selectFeedbackItems, selectSelectedCompany],

  (feedbackItems, selectedCompany) => {
    if (!selectedCompany) {
      return feedbackItems;
    }

    const companyName = selectedCompany.toUpperCase();
    return feedbackItems.filter(
      (item) => item.company.toUpperCase() === companyName,
    );
  },
);

const selectCompanyList = createSelector(
  [selectFeedbackItems],
  (feedbackItems) => [...new Set(feedbackItems.map((item) => item.company))],
);

// Store
export const useFeedbackItemsStore = create<FeedbackItemsStore>((set, get) => ({
  // Variablen?
  isLoading: false,
  error: '',
  feedbackItems: [],
  selectedCompany: '',

  // ???
  getFilteredFeedbackItems: () => selectFilteredFeedbackItems(get()),
  getCompanyList: () => selectCompanyList(get()),

  //actions
  addItemToList: async (text) => {
    const company = text
      .split(' ')
      .find((word) => word.startsWith('#'))!
      .substring(1);

    const badgeLetter = company.charAt(0).toUpperCase();

    const newItem: FeedbackItemProps = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter,
      company,
      text,
      daysAgo: 0,
    };

    set((state) => ({ feedbackItems: [...state.feedbackItems, newItem] }));

    const setFeedbackItemsToServer = async () => {
      await fetch(
        'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        },
      );
    };

    setFeedbackItemsToServer();
  },
  setSelectCompany: (company) => set({ selectedCompany: company }),
  fetchFeedbackItems: async () => {
    set({ isLoading: true });

    try {
      const response = await fetch(
        'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      set({ feedbackItems: data.feedbacks });
    } catch (error) {
      set({ error: `Error during component mount: ${error}` });
    } finally {
      set({ isLoading: false });
    }
  },
}));
