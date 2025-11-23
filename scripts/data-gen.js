import fetch from 'node-fetch';
import { faker } from '@faker-js/faker';

const API_URL = 'http://localhost:3029/api/v1/teams';
const COUNT = 100;

async function createRandomTeam() {
  return {
    name:    faker.company.name(),
    country: faker.location.country(),
    engine:  faker.vehicle.manufacturer() + ' ' + faker.vehicle.model(),
    tyre:    faker.helpers.arrayElement(['Pirelli','Bridgestone','Goodyear','Michelin']),
  };
}

async function seed() {
  for (let i = 0; i < COUNT; i++) {
    const team = await createRandomTeam();
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(team)
      });

      if (!res.ok) {
        console.error(`Failed to create team #${i}:`, await res.text());
      } else {
        const data = await res.json();
        console.log(`Created team #${i}: ${team.name}`);
      }
    } catch (err) {
      console.error(`Error at team #${i}:`, err);
    }

    await new Promise(r => setTimeout(r, 50));
  }
  console.log('Seeding complete');
}

seed();
