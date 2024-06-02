import { z } from 'zod';
import { tool } from 'ai';
import axios from 'axios';
import { JSDOM } from 'jsdom';

export const tools = {
  fetchWebsite: tool({
    description: 'If someone asks you about anima information, use this function to fetch it.',
    parameters: z.object({
      url: z.string().describe('the url'),
    }),
    execute: async ({ url }) => {
      console.log('fetchWebsite: ' + url);
      const response = await axios.get(url);
      const html = await response.data;
      const dom = new JSDOM(html);
      const firstSection = dom.window.document.querySelector('section');

      function removeAllAttributes(element: Element): string {
        const attributes = element.attributes;
        while (attributes.length > 0) {
          element.removeAttribute(attributes[0].name);
        }
        for (let i = 0; i < element.children.length; i++) {
          removeAllAttributes(element.children[i]);
        }
        return element.outerHTML.replace(/\s{2,}/g, ' ').replace(/>\s+</g, '><').trim();
      }

      const text = firstSection ? removeAllAttributes(firstSection) : '';
      return text;
    }
  }),
};