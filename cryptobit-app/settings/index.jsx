let coins = [];

const baseURL = 'https://api.coinranking.com/v2/coins';
const apiKey = 'coinranking091f5a5ea38278e572ebe29b5e6e3138adaa4db5b6556f77';

const proxyURL = 'https://cors-anywhere.herokuapp.com/';

fetch(`${proxyURL}${baseURL}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${apiKey}`,
        'Access-Control-Allow-Origin': '*'
    }

}).then((response) => {
    if (response.ok) {
        response.json().then((json) => {
            // console.log(json.data.coins);
            for (let i = 0; i < json.data.coins.length; i++) {
                let name = json.data.coins[i].name;
                let value = json.data.coins[i].name;
                let price = parseFloat(json.data.coins[i].price).toFixed(2);
                let change = json.data.coins[i].change;
                let id = json.data.coins[i].rank;
                
                // let iconUrl = json.data.coins[i].iconUrl;
                coins.push({ name, value, price, change, id});
            }
        })
    }
})


registerSettingsPage((/* { settings } */) => (
  <Page>
    <Section title="Simple item list">
        <AdditiveList
          title="A list with Autocomplete"
          settingsKey="cryptoList"
          maxItems="5"
          addAction={
            <TextInput
              title="Add List Item"
              label="➡️ Add item"
              placeholder="Type something"
              action="Add Item"
              onAutocomplete={(value) =>
                coins.filter(
                  (option) =>
                    option.value.toLowerCase().indexOf(value.toLowerCase()) >= 0,
                  )
              }
            />
          }
        />
      </Section>
  </Page>
));