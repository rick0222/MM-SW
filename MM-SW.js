/* Magic Mirror
 * Module : MM-SW
 *
 *
 * by Rick93
 */

Module.register("MM-SW",{

	default: {
		
		
		maxWidth: "250px",
		animationSpeed: 3000, 
		initialLoadDelay: 4250,
		retryDelay: 2500,
		updateInterval: 60*60*1000 ,

		},
		
	getStyles: function() {
        return ["MM-SW.css"];	},

	start:function(){       
		Log.info("Starting module: " + this.name);
        requiresVersion: "2.1.0",

        this.url = "https://api.data.gov.sg/v1/environment/4-day-weather-forecast";
		this.SW = [];
		//this.scheduleUpdate(this.config.initialLoadDelay);       // <-- When the module updates (see below)
		this.scheduleUpdate();  
    },
	getDom:function(){	
		
		var wrapper = document.createElement("div");
		wrapper.className = "wrapper";
		wrapper.style.maxWidth = this.config.maxWidth;
		
		
	if (!this.loaded) {
			
		wrapper.innerHTML = "Loading....";
		wrapper.classList.add("dimmed", "light", "small");
		return wrapper;
	}	
		
			
		var SW = this.SW;
		
		
		var top = document.createElement("div");
			top.classList.add("list-row");
		
		var direction = document.createElement("div");
			direction.classList.add("xsmall", "bright", "direction");
			direction.innerHTML = "Direction:" + SW.direction;
			wrapper.appendChild(direction);

		return wrapper;
		
		},
		
	processSW: function(data) { 
		this.SW = data; 
		//console.log(this.SW); // uncomment to see if you're getting data (in dev console)
		this.loaded = true;
	},
	
	
	scheduleUpdate: function() { 
		setInterval(() => {
		    this.getSW();
		}, this.config.updateInterval);
		this.getSW(this.config.initialLoadDelay);
		var self = this;
	},
	
	getSW: function() { 
		this.sendSocketNotification('GET_SW', this.url);
	},


	socketNotificationReceived: function(notification, payload) { 
		if (notification === "SW_RESULT") {
		    this.processSW(payload);

		}
		this.updateDom(this.config.initialLoadDelay);
	},
	
	})
