module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env', // Anahtarları içe aktarırken kullanılacak isim
      path: '.env',       // Hangi dosyayı kullanacağını belirtiriz
    }],
  ],
};
