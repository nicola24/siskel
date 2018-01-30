var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {

    // if toggled, change like to true
    // console.log(this.get('like'), 'console');
    this.set('like', false);

    /*
    this.on('change:like', function(e) {
      e.get('like');
    });

    */
    // your code here
  }
});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    this.on('change', function() { 
      // alert us when comparator is changed!
      this.sort();
    });
    // your code here
  },

  comparator: 'title',

  sortByField: function(field) {
    // your code here
    // when invoked, change comparator to 'field'
    // if function is invoked with a new field, sort the data by the new field, else, sort by title which is default;
    this.comparator = field;
    this.sort();
  }

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    // your code here
    this.on('change', this.render());
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    // your code here
    this.on('change', this.model.toggleLike());
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    this.on('sort', this.render());
    // your code here
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
