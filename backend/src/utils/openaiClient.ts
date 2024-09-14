import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log(OPENAI_API_KEY);
export async function getFinancialAnalysis(prompt: string): Promise<any> {
  const apiUrl = "https://api.openai.com/v1/completions";

  const requestBody = {
    model: "gpt-4",
    prompt: prompt,
    max_tokens: 1000,
    temperature: 0.7,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`, 
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      
      throw new Error(`OpenAI API Error: ${response.statusText}`);
    }

    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to get financial analysis.");
  }
}
