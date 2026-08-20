import { GoogleGenAI } from "@google/genai";

export const STORAGE_KEY_API_KEY = "QUAN_LY_LOP_GEMINI_API_KEY";
export const STORAGE_KEY_MODEL = "QUAN_LY_LOP_GEMINI_MODEL";

export const MODEL_FALLBACK_LIST = [
  "gemini-3-flash-preview",
  "gemini-3-pro-preview",
  "gemini-2.5-flash",
];

export const getStoredApiKey = (): string => {
  return localStorage.getItem(STORAGE_KEY_API_KEY) || "";
};

export const setStoredApiKey = (key: string) => {
  localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
};

export const getStoredModel = (): string => {
  return localStorage.getItem(STORAGE_KEY_MODEL) || "gemini-3-flash-preview";
};

export const setStoredModel = (model: string) => {
  localStorage.setItem(STORAGE_KEY_MODEL, model);
};

export interface GeminiResponseResult {
  text: string;
  modelUsed: string;
  error?: string;
  isError: boolean;
  statusText?: string;
}

/**
 * Executes a prompt with Gemini API using stored user key & automatic model retry/fallback chain.
 */
export const generateWithFallback = async (
  prompt: string,
  systemInstruction?: string
): Promise<GeminiResponseResult> => {
  const userApiKey = getStoredApiKey();
  const preferredModel = getStoredModel();

  // Create ordered model list starting with preferredModel
  const modelsToTry = Array.from(
    new Set([preferredModel, ...MODEL_FALLBACK_LIST])
  );

  let lastErrorMsg = "";

  for (const modelName of modelsToTry) {
    try {
      // If user provided a key in localStorage, use client-side GenAI directly
      if (userApiKey) {
        const ai = new GoogleGenAI({ apiKey: userApiKey });
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: systemInstruction ? { systemInstruction } : undefined,
        });

        if (response && response.text) {
          return {
            text: response.text,
            modelUsed: modelName,
            isError: false,
            statusText: "Hoàn tất",
          };
        }
      }

      // Otherwise try server proxy endpoint
      const res = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(userApiKey ? { "x-gemini-api-key": userApiKey } : {}),
        },
        body: JSON.stringify({
          prompt,
          model: modelName,
          systemInstruction,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.text) {
          return {
            text: data.text,
            modelUsed: modelName,
            isError: false,
            statusText: "Hoàn tất",
          };
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        lastErrorMsg = errData.error || `HTTP ${res.status}: ${res.statusText}`;
      }
    } catch (err: any) {
      console.warn(`[Gemini Fallback] Model ${modelName} failed:`, err);
      lastErrorMsg = err.message || String(err);
    }
  }

  // All models failed -> Return error state according to AI_INSTRUCTIONS.md rules
  return {
    text: `⚠️ **ĐÃ DỪNG DO LỖI API**: ${lastErrorMsg || "Không thể kết nối Gemini API. Vui lòng kiểm tra API Key."}\n\n*Nguyên văn lỗi:* \`${lastErrorMsg || "429 RESOURCE_EXHAUSTED"}\``,
    modelUsed: preferredModel,
    isError: true,
    error: lastErrorMsg,
    statusText: "Đã dừng do lỗi",
  };
};
