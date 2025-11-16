<template>
  <div class="app-container">
    <div class="glass-card">
      <h1>🔗 Short Link & QR Code Generator</h1>
      <form @submit.prevent="createShortUrl">
        <input v-model="originalUrl" placeholder="Enter URL..." required />
        
        <div class="row">
          <label>QR Color</label>
          <input type="color" v-model="color" />
        </div>

        <div class="row">
          <label>Background</label>
          <input type="color" v-model="bgColor" />
        </div>

        <label>Expiration</label>
        <select v-model="expiration">
          <option value="7">7 days</option>
          <option value="30">30 days</option>
          <option value="unlimited">Unlimited</option>
        </select>

        <button type="submit">Generate</button>
      </form>

      <div v-if="shortUrl" class="result">
        <p class="short-link">
          Short URL: 
          <a :href="shortUrl" target="_blank">{{ shortUrl }}</a>
        </p>
        <img :src="qrCode" alt="QR Code" />
        <a :href="qrCode" download="qrcode.png" class="download-button">Download QR Code</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originalUrl: '',
      color: '#000000',
      bgColor: '#ffffff',
      expiration: '7',
      shortUrl: '',
      qrCode: '',
    };
  },
  methods: {
    async createShortUrl() {
      try {
        const response = await fetch('/api/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            originalUrl: this.originalUrl,
            color: this.color,
            bgColor: this.bgColor,
            expiration: this.expiration,
          }),
        });

        const data = await response.json();

        if (data.error) {
          alert(data.error);
        } else {
          this.shortUrl = data.shortUrl;
          this.qrCode = data.qrCode;
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Failed to connect to server.');
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.app-container {
  background: url('/bg.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
}

.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  max-width: 450px;
  width: 90%;
  color: white;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-card h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

input[type="text"],
input[type="url"],
select {
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

button {
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: rgba(0, 0, 0, 0.9);
}

.result {
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.short-link {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.6rem 1rem;
  border-radius: 8px;
  word-break: break-all;
}

.short-link a {
  color: #ffffff;
  text-decoration: underline;
}

/* Styled download button */
.download-button {
  margin-top: 1rem;
  display: inline-block;
  padding: 0.7rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  backdrop-filter: blur(10px);
  transition: background 0.3s;
}

.download-button:hover {
  background: rgba(255, 255, 255, 0.25);
}

.result img {
  margin: 1rem auto;
  max-width: 200px;
}
</style>