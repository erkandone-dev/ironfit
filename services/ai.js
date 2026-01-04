export async function askAI(message) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Tırnak içine kendi Groq key'ini (gsk_...) yapıştır
        "Authorization": "Bearer YOUR_GROQ_API_KEY_HERE"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", 
        messages: [
          { role: "system", content: "Sen profesyonel bir fitness koçusun. Türkçe cevap ver." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await res.json();

    // Groq'tan gelen cevabı temizleyip ekrana gönderiyoruz
    return data.choices[0].message.content;

  } catch (error) {
    console.error("AI Servis Hatası:", error);
    return "Üzgünüm, şu an bağlantı kuramıyorum.";
  }
}