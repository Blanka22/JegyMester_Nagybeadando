using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JegyMester.API.Data;
using JegyMester.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace JegyMester.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {

        private readonly AppDbContext _context;

        public MovieController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Movie>> GetMovies()
        {
            return _context.Movies.ToList();
        }

        [HttpGet("{id}")]
        public IActionResult GetMovie(int id)
        {
            var movie = _context.Movies.Find(id);

            if (movie == null)
                return NotFound();

            return Ok(movie);
        }
     //   [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult AddMovie(Movie movie)
        {
            _context.Movies.Add(movie);
            _context.SaveChanges();

            return Ok(movie);
        }
      //  [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(int id)
        {
            var movie = _context.Movies.Find(id);

            if (movie == null)
                return NotFound();

            bool hasScreenings =
                _context.Screenings.Any(s => s.MovieId == id);

            if (hasScreenings)
                return BadRequest("Movie has screenings");

            _context.Movies.Remove(movie);

            _context.SaveChanges();

            return Ok();
        }
       // [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult UpdateMovie(int id, Movie movie)
        {
            var existingMovie = _context.Movies.Find(id);

            if (existingMovie == null)
                return NotFound();

            existingMovie.Title = movie.Title;
            existingMovie.Description = movie.Description;
            existingMovie.Duration = movie.Duration;

            _context.SaveChanges();

            return Ok(existingMovie);
        }

    }
}
