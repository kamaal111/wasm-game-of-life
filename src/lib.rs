mod utils;

use wasm_bindgen::prelude::*;

extern crate js_sys;
use js_sys::Math as JSMath;

extern crate fixedbitset;
use fixedbitset::FixedBitSet;

extern crate web_sys;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    pub width: u32,
    pub height: u32,
    cells: FixedBitSet,
}

#[wasm_bindgen]
impl Universe {
    pub fn new() -> Universe {
        utils::set_panic_hook();

        let width = 64;
        let height = 64;

        let size = (width * height) as usize;
        let mut cells = FixedBitSet::with_capacity(size);

        for i in 0..size {
            cells.set(i, JSMath::random() < 0.5);
        }

        Universe {
            width,
            height,
            cells,
        }
    }

    pub fn cells(&self) -> *const u32 {
        self.cells.as_slice().as_ptr()
    }

    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for column in 0..self.width {
                let idx = self.get_index(row, column);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, column);

                let next_cell = match (cell, live_neighbors) {
                    // Rule 1: Any live cell with fewer than two live neighbors
                    // dies, as if caused by underpopulation.
                    (true, x) if x < 2 => false,
                    // Rule 2: Any live cell with two or three live neighbors
                    // lives on to the next generation.
                    (true, 2) | (true, 3) => true,
                    // Rule 3: Any live cell with more than three live
                    // neighbors dies, as if by overpopulation.
                    (true, x) if x > 3 => false,
                    // Rule 4: Any dead cell with exactly three live neighbors
                    // becomes a live cell, as if by reproduction.
                    (false, 3) => true,
                    // All other cells remain in the same state.
                    (otherwise, _) => otherwise,
                };
                next.set(idx, next_cell);
            }
        }

        self.cells = next;
    }

    /// Set the width of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_width(&mut self, width: u32) {
        self.width = width;

        let size = (width * self.height) as usize;

        self.cells = self.make_dead_cells(size);
    }

    /// Set the height of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_height(&mut self, height: u32) {
        self.height = height;

        let size = (height * self.width) as usize;

        self.cells = self.make_dead_cells(size);
    }
}

impl Universe {
    /// Get the dead and alive values of the entire universe.
    pub fn get_cells(&self) -> Vec<Cell> {
        let mut cells = Vec::new();
        for index in 0..self.cells.len() {
            if self.cells[index] {
                cells.push(Cell::Alive)
            } else {
                cells.push(Cell::Dead)
            }
        }
        cells
    }

    /// Set cells to be alive in a universe by passing the row and column
    /// of each cell as an array.
    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for (row, column) in cells.iter().cloned() {
            let index = self.get_index(row, column);
            self.cells.set(index, true);
        }
    }
}

impl Universe {
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
        for delta_row in [(self.height - 1), 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (column + delta_col) % self.width;
                let idx = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[idx] as u8;
            }
        }
        count
    }

    fn make_dead_cells(&self, size: usize) -> FixedBitSet {
        let mut cells = FixedBitSet::with_capacity(size);

        for i in 0..size {
            cells.set(i, false);
        }

        cells
    }
}
