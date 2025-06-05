import { create } from 'zustand';
import type { FeedbackItemProps } from '../types';

type FeedbackItemsStore = {
  isLoading: boolean;
  error: string;
  feedbackItems: FeedbackItemProps[];
  selectedCompany: string;
  // getFilteredFeedbackItems: () => FeedbackItemProps[];
  addItemToList: (text: string) => Promise<void>;
  setSelectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<FeedbackItemsStore>((set) => ({
  // Variablen?
  isLoading: false,
  error: '',
  feedbackItems: [],
  selectedCompany: '',

  // ???

  // getFilteredFeedbackItems: () => {
  //   const state = get();

  //   if (!state.selectedCompany) {
  //     return state.feedbackItems;
  //   }

  //   return state.feedbackItems.filter((item) => {
  //     return item.company.toUpperCase() === state.selectedCompany.toUpperCase();
  //   });
  // },

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
