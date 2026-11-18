import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class InventoryPage extends BasePage {
  get openMenuButton(): Locator {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  get logoutLink(): Locator {
    return this.page.getByRole('link', { name: 'Logout' });
  }

  get cartLink(): Locator {
    return this.page.locator('a.shopping_cart_link');
  }

  get cartBadge(): Locator {
    return this.page.locator('.shopping_cart_badge');
  }

  productAddToCartButton(productName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' });
  }

  async addToCart(productName: string): Promise<void> {
    await this.click(this.productAddToCartButton(productName));
  }

  async logout(): Promise<void> {
    await this.click(this.openMenuButton);
    await this.click(this.logoutLink);
  }
}
