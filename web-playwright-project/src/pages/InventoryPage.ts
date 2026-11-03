import { type Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class InventoryPage extends BasePage {
  get firstAddToCartButton(): Locator {
    return this.page.locator('.inventory_item').first().getByRole('button', { name: 'Add to cart' });
  }

  async addFirstItemToCart(): Promise<void> {
    await this.click(this.firstAddToCartButton);
  }
}
