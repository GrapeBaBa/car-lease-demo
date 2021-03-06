var tracing = require(__dirname+'/../../../tools/traces/trace.js');
var fs = require('fs');
var reload = require('require-reload')(require),
    configFile = reload(__dirname+'/../../../configurations/configuration.js');

function update(req,res)
{
	tracing.create('ENTER', 'PUT trace', []);
	configFile = reload(__dirname+'/../../../configurations/configuration.js');
	fs.readFile(__dirname+'/../../../configurations/configuration.js', 'utf8', function (err,data)
	{
		if (err)
		{
			return console.log(err);
		}
		if(configFile.config.trace)
		{
			var result = data.replace(/config.trace = true;/g, 'config.trace = false;');
		}
		else
		{
			var result = data.replace(/config.trace = false;/g, 'config.trace = true;');	
		}

		fs.writeFile(__dirname+'/../../../configurations/configuration.js', result, 'utf8', function (err)
		{
			if (err)
			{	
				return console.log(err);
			}
			else
			{
				configFile = reload(__dirname+'/../../../configurations/configuration.js');
				var trace = 'OFF';
				if(configFile.config.trace)
				{
					trace = 'ON';
				}
				res.send({"trace":configFile.config.trace})
			}			
		});
	});
}

exports.update = update;
